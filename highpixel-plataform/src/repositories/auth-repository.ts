import api from "@/services/api";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, {
    message: "Por favor, digite um endereço de e-mail"
  }).max(255).email({
    message: "Por favor, digite um endereço de e-mail válido"
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres."
  }).max(255),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, {
    message: "Nome precisa ter pelo menos 3 letras"
  }).max(20)
})

export type RegisterRequest = z.infer<typeof registerSchema>
export type LoginRequest = z.infer<typeof loginSchema>

type AuthResponse = {
  token?: string;
};

const base = '/v1/account';

export const authRepository = {
  register: async (data: RegisterRequest) => {
    const response = await api.post<void>(`${base}/register`, data);
    return response.data;
  },
  login: async (data: LoginRequest) => {
    // Backend expects Authorization header with Basic base64(email:password)
    const buffer = typeof window !== 'undefined'
      ? btoa(`${data.email}:${data.password}`)
      : Buffer.from(`${data.email}:${data.password}`).toString('base64');

    const response = await api.get<AuthResponse>(`${base}/authenticate`, {
      headers: {
        Authorization: `Basic ${buffer}`,
      }
    });

    return response.data;
  }
}
