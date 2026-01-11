"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Redirect from "@/lib/redirect";
import { authRepository } from "@/repositories/auth-repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  username: z
    .string()
    .min(3, { message: "Username deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export default function FormRegister() {
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
      await authRepository.register(values as any);
      toast.success("Conta criada com sucesso. Faça login para continuar.");
      router.push("/(public)/(auth)/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao cadastrar");
    }
  }

  return (
    <div className="min-w-min lg:max-w-[420px]">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Crie sua conta</h1>
        <p className="mt-2 text-zinc-400">
          Preencha os dados abaixo para começar
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-8"
      >
        <div className="flex flex-col gap-3">
          {(() => {
            const nameReg = register("name");
            return (
              <Input
                {...nameReg}
                placeholder="Nome"
                border
                onChange={(v: any) => {
                  if (typeof v === "string")
                    nameReg.onChange({ target: { value: v } } as any);
                  else nameReg.onChange(v);
                }}
              />
            );
          })()}

          {(() => {
            const usernameReg = register("username");
            return (
              <Input
                {...usernameReg}
                placeholder="Username"
                border
                onChange={(v: any) => {
                  if (typeof v === "string")
                    usernameReg.onChange({ target: { value: v } } as any);
                  else usernameReg.onChange(v);
                }}
              />
            );
          })()}

          {(() => {
            const emailReg = register("email");
            return (
              <Input
                {...emailReg}
                placeholder="Seu e-mail"
                border
                onChange={(v: any) => {
                  if (typeof v === "string")
                    emailReg.onChange({ target: { value: v } } as any);
                  else emailReg.onChange(v);
                }}
              />
            );
          })()}

          {(() => {
            const passReg = register("password");
            return (
              <Input
                {...passReg}
                placeholder="Sua senha"
                border
                password
                onChange={(v: any) => {
                  if (typeof v === "string")
                    passReg.onChange({ target: { value: v } } as any);
                  else passReg.onChange(v);
                }}
              />
            );
          })()}
        </div>
        <Button label="Cadastrar" size={1} background="red" />
        <div className="space-x-1 text-center text-zinc-400">
          <span>Já tem uma conta?</span>
          <Redirect
            href="/signin"
            className="text-[#D60620] transition-all hover:brightness-75"
          >
            Entre aqui!
          </Redirect>
        </div>
      </form>
    </div>
  );
}
