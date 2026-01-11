"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import Redirect from "@/lib/redirect";
import { authRepository } from "@/repositories/auth-repository";
import { userRepository } from "@/repositories/user-repository";
import { setAPIAuthToken } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const data = await authRepository.login(values);

      if (!data?.token) {
        toast.error("Não foi possível autenticar.");
        return;
      }

      const { token } = data;

      // set token for subsequent requests
      setAPIAuthToken(token);

      // fetch user info
      const user = await userRepository.me();

      // persist in auth store (this sets cookie + api header inside store)
      useAuth.getState().authenticate(user as User, token);

      router.push("/(private)/timeline");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao autenticar");
    }
  }
  return (
    <div className="mt-10 min-w-min space-y-8 lg:max-w-[420px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-12"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Bem-vindo de volta!</h1>
          <p className="mt-2 text-zinc-400">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {(() => {
            const emailReg = register("email");
            return (
              <Input
                {...emailReg}
                border
                placeholder="Seu e-mail"
                onChange={(v: any) => {
                  if (typeof v === "string") {
                    emailReg.onChange({ target: { value: v } } as any);
                  } else {
                    emailReg.onChange(v);
                  }
                }}
              />
            );
          })()}

          {(() => {
            const passReg = register("password");
            return (
              <Input
                {...passReg}
                border
                placeholder="Sua senha"
                password
                onChange={(v: any) => {
                  if (typeof v === "string") {
                    passReg.onChange({ target: { value: v } } as any);
                  } else {
                    passReg.onChange(v);
                  }
                }}
              />
            );
          })()}

          <div className="space-x-1 text-zinc-400">
            <span>Esqueci</span>
            <Redirect
              href="/recover-password"
              className="text-[#D60620] transition-all hover:brightness-75"
            >
              minha senha
            </Redirect>
          </div>

          <Button label="ENTRAR" size={1} background="red" type="submit" />

          <div className="space-x-1 text-center text-zinc-400">
            <span>Não tem uma conta ainda?</span>
            <Redirect
              href="/signup"
              className="text-[#D60620] transition-all hover:brightness-75"
            >
              Registre aqui!
            </Redirect>
          </div>

          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <span>Ou continue com:</span>
            <button
              type="button"
              className="flex items-center gap-2 bg-none px-4 py-2 transition-all"
              title="Em breve"
            >
              <Image
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
                quality={100}
              />
              Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
