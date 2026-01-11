import { setAPIAuthToken } from "@/services/api";
import { create } from "zustand"
import Cookies from "js-cookie";
import { userRepository } from "@/repositories/user-repository";

interface AuthStore {
  user: User | null;
  token: string | null;
  authenticate: (user: User, token: string) => void;
  fetchUser: () => Promise<User | undefined>;
  clearUser: () => void;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: undefined,
  token: Cookies.get('token') || null,
  authenticate: (user: User, token: string) => {
    setAPIAuthToken(token)
    Cookies.set('token', token)
    set({ user, token })
  },
  fetchUser: async () => {
    try {
      const token = Cookies.get('token')

      if (token) {
        setAPIAuthToken(token)
        const user = await userRepository.me()
        set({ user, token })

        return user
      } else {
        get().clearUser()
      }
    } catch (error) {
      get().clearUser()
    }
  },
  setUser: (user: User) => {
    set({ user })
  },
  clearUser: () => {
    Cookies.remove('token')
    set({ user: null, token: null })
  }
}))