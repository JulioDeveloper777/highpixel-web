import { CloudinaryDeleteService, CloudinaryUploadService } from "@infra/services/cloudinary/CloudinaryStorage";
import { getMimeTypeAndExtensionFromBase64 } from "@utils/getMimeType";
import { uploadConfig } from "@config/upload-config";
import { Either, left, right } from "@core/logic/Either";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IProfilesRepository } from "@modules/social/repositories/IProfileRepository";
import { ContentAvatarError } from "@modules/social/useCases/Content/errors/ContentAvatarError";
import { ContentBannerError } from "@modules/social/useCases/Content/errors/ContentBannerError";
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

type ContentAvatarResponse = Either<ContentUserNotExist | ContentFileIsTooLarge | ContentBannerError | ContentUploadError, FileResponse>;

export class ContentBanner {
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

    const profile = await this.profilesRepository.findOne(id);
    if (!profile) {
      return left(new ContentUserNotExist());
    }

    // verify if file is a base64
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const fileInfo = getMimeTypeAndExtensionFromBase64(base64, "banner");

    if (fileInfo.error) {
      return left(new ContentBannerError());
    }

    // Check limits based on user type
    const limits = user.isPremium ? uploadConfig.banner.limits.premium : uploadConfig.banner.limits.default;
    const fileLimit = limits;

    // Check if the file type is allowed
    const mimeTypesConfig = user.isPremium ? uploadConfig.banner.mimeTypes.premium : uploadConfig.banner.mimeTypes.default;
    const allowedExtensions = Object.keys(mimeTypesConfig);

    if (!allowedExtensions.includes(file.mimetype)) {
      return left(new ContentBannerError());
    }

    // Check if the file size exceeds the limit
    if (file.size > fileLimit) {
      return left(new ContentFileIsTooLarge());
    }

    // For now, delete user banner if already have a custom.
    if (profile.banner) {
      const public_id = profile.banner.split('/').pop()?.split('.')[0]; // Extract public_id from URL
      if (public_id) {
        await deleteService.deleteBanner(public_id);
      }
    }

    try {
      const upload = await uploadService.uploadBanner(file);

      profile.setBannerURL = upload.url;
      await this.profilesRepository.save(profile);

      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(new ContentUploadError());
    }
  }
}