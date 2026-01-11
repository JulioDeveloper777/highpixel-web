import { CloudinaryDeleteService, CloudinaryUploadService } from "@infra/services/cloudinary/CloudinaryStorage";
import { getMimeTypeAndExtensionFromBase64 } from "@utils/getMimeType";
import { uploadConfig } from "@config/upload-config";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IProfilesRepository } from "@modules/social/repositories/IProfileRepository";
import { ContentAvatarError } from "@modules/social/useCases/Content/errors/ContentAvatarError";
import { ContentFileIsTooLarge } from "@modules/social/useCases/Content/errors/ContentFileIsTooLarge";
import { ContentUploadError } from "@modules/social/useCases/Content/errors/ContentUploadError";
import { ContentUserNotExist } from "@modules/social/useCases/Content/errors/ContentUserNotExist";

type ContentAvatarRequest = {
  file: Express.Multer.File;
  id: string;
};

type FileResponse = {
  file: string;
};

type ContentAvatarResponse = Either<ContentAvatarError | ContentUserNotExist | ContentFileIsTooLarge | ContentUploadError, FileResponse>;

export class ContentAvatar {
  constructor(
    private usersRepository: IUserRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    id,
    file,
  }: ContentAvatarRequest): Promise<ContentAvatarResponse> {
    const uploadService = new CloudinaryUploadService();
    const deleteService = new CloudinaryDeleteService();

    if (!file) {
      return left(new ContentAvatarError());
    }

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return left(new ContentUserNotExist());
    }

    // verify if file is a base64
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const fileInfo = getMimeTypeAndExtensionFromBase64(base64, "avatar");

    if (fileInfo.error) {
      return left(new ContentAvatarError());
    }

    // Check limits based on user type
    const limits = user.isPremium ? uploadConfig.avatar.limits.premium : uploadConfig.avatar.limits.default;
    const fileLimit = limits;

    // Check if the file type is allowed
    const mimeTypesConfig = user.isPremium ? uploadConfig.avatar.mimeTypes.premium : uploadConfig.avatar.mimeTypes.default;
    const allowedExtensions = Object.keys(mimeTypesConfig);

    if (!allowedExtensions.includes(file.mimetype)) {
      return left(new ContentAvatarError());
    }

    // Check if the file size exceeds the limit
    if (file.size > fileLimit) {
      return left(new ContentFileIsTooLarge());
    }

    // Delete existing avatar if present
    const profile = await this.profilesRepository.findOne(id);
    if (!profile) {
      return left(new ContentUserNotExist());
    }

    if (profile.avatar) {
      const public_id = profile.avatar.split('/').pop()?.split('.')[0]; // Extract public_id from URL
      if (public_id) {
        await deleteService.deleteAvatar(public_id);
      }
    }

    try {
      const upload = await uploadService.uploadAvatar(file);

      profile.setAvatarURL = upload.url;
      await this.profilesRepository.save(profile);

      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(new ContentUploadError());
    }
  }
}