"use client";

import { Header } from "@/app/components/ui/header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  function handleClick() {
    router.push("/");
  }

  return (
    <div className="relative flex h-screen w-full flex-col bg-[url('/bg2.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <Header transparent/>
      <div className="mb-10 flex h-full w-full items-center justify-center lg:mb-0">
        <div className="mx-10 flex flex-col items-center justify-center lg:flex-row lg:gap-14">
          <Image
            src="/detercontagem.png"
            alt="404"
            width={360}
            height={360}
            quality={100}
          />
          <div className="mx-5 flex h-full w-[300px] flex-col justify-center gap-10 lg:w-[500px]">
            <div className="flex flex-col">
              <h2 className="text-7xl font-bold text-[#D60620] lg:text-8xl">
                432...
              </h2>
              <span className="text-3xl font-bold text-[#FFFFFF]">
                Espere, detenham a contagem!
              </span>
            </div>
            <div>
              <p className="text-xl text-[#D60620]">
                * PICA-PAU APARECE E AVISA:
              </p>
              <p className="mt-6 text-lg text-[#FFFFFF]">
                A página que você solicitou ainda não está finalizada.
                Lembre-se: esta é uma versão beta e logo ela estará online.
              </p>
            </div>
            <button
              onClick={handleClick}
              className="h-16 w-48 text-nowrap rounded-[10px] bg-gradient-to-r from-[#D60620] to-[#D60620] px-4 py-3 text-lg font-medium uppercase text-[#FFFFFF] transition-all hover:brightness-75"
            >
              Voltar a Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
