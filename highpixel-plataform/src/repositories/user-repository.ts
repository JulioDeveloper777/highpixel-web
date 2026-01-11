import api from "@/services/api";

const base = '/v1/account';

export const userMessages = {
  error: {
    default: "Algo deu errado, atualize a página e tente novamente."
  },
  success: {
    updated: "Salvo com sucesso!",
  }
}

export const userRepository = {
  me: async () => {
    const { data: response } = await api.get<User>(`${base}`)

    return response
  },
  findByIdOrEmail: async (idOrEamil: string) => {
    const { data: response } = await api.get<User>(`/v1/social/profiles/${idOrEamil}`)

    return response
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post('/v1/social/profiles/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
  update: async (userId: string, data: Partial<User>) => {
    const { data: response } = await api.put<User>(`/v1/social/profiles`, data)

    return response;
  }
}
