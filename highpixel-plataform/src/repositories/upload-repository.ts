import api from "@/services/api";

export interface UploadResponse {
  signedUrl: string;
  fileId: string;
}

const resource = 'uploads'

export const uploadRepository = {
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadResponse>(`${resource}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return response.data;
  }

}
