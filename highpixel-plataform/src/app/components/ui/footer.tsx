import Redirect from "@/lib/redirect";
import Image from "next/image";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="flex items-center justify-between bg-[#0C0C0C] px-10 py-4">
      <div className="relative flex flex-col items-center justify-center">
        <Image
          src={"/coroa2.svg"}
          alt="coroa"
          width={50}
          height={50}
          quality={100}
          className="absolute bottom-[140px] left-1"
        />
        <Image
          src={"/lr.svg"}
          alt="Logo LowRacing"
          width={150}
          height={150}
          quality={100}
        />
        <div className="mb-2 flex items-center gap-4">
          <a href="http://www.youtube.com" target="_blank">
            <FaSquareYoutube className="text-white" />
          </a>
          <a href="http://www.x.com" target="_blank">
            <FaSquareXTwitter className="text-white" />
          </a>
        </div>
        <span className="text-xs text-zinc-500">© 2024 Low Racing</span>
      </div>
      <div className="flex items-center justify-center gap-20 text-zinc-400">
        <div className="flex flex-col gap-2">
          <Redirect href="/">Inicio</Redirect>
          <Redirect href="/">Marketplace</Redirect>
          <Redirect href="/">Politicas de Privacidade</Redirect>
          <Redirect href="/">Termos de serviço</Redirect>
        </div>
        <div className="flex flex-col gap-2">
          <Redirect href="/">Serviços</Redirect>
          <Redirect href="/">Produtos</Redirect>
          <Redirect href="/">Entre em nosso time</Redirect>
          <Redirect href="/">Seja um apoiador</Redirect>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={"/atencao12.svg"}
          alt="Logo LowRacing"
          width={100}
          height={100}
          quality={100}
        />
        <span className="text-xs text-zinc-500">
          Violência, Linguagem Imprópria
        </span>
      </div>
    </div>
  );
}
