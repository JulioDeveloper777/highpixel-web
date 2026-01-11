import { emitter } from "@/lib/mitt";
import axios from "axios";

const getAPIClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  const api = axios.create({
    baseURL
  })

  api.defaults.headers.common.Accept = 'application/json'
  api.defaults.headers.common['Content-Type'] = 'application/json'

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        emitter.emit('logout');
      }

      throw error;
    },
  );

  return api
}

const api = getAPIClient()

export function setAPIAuthToken(token: string | null) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default api;
