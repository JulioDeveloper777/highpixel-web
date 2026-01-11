  "use client";

  import { Header } from "@/app/components/ui/header";
  import Image from "next/image";

  export default function ContentMain() {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
        <Header transparent />

        {/* === TEXTOS VERTICAIS LATERAIS === */}
        <div className="absolute left-0 top-0 hidden h-full w-[100px] flex-col items-center justify-end overflow-hidden lg:flex">
          <div className="flex flex-col items-center justify-center space-y-16 rotate-180 [writing-mode:vertical-rl] font-scribble text-2xl text-[#606060] select-none">
            <h3 className="text-nowrap">
              HIGH PIXEL EM BREVE HIGH PIXEL EM BREVE
            </h3>
            <h3 className="text-nowrap">
              EM BREVE HIGH PIXEL EM BREVE HIGH PIXEL
            </h3>
          </div>
        </div>

        {/* === CONTEÚDO PRINCIPAL === */}
        <main className="relative flex flex-1 items-center justify-center px-6 lg:px-12">
          <div className="relative flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
            {/* Texto e botões */}
            <div className="relative z-10 max-w-3xl text-center lg:text-left">
              <div className="mb-4 inline-block rounded-lg border border-[#FF0000] px-4 py-2 text-xs text-white sm:text-sm">
                <h3>10 pessoas estão conosco!</h3>
              </div>

              <h1 className="font-krona text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                BEM VINDO AO
                <span className="block text-[#D60620]">HIGH PIXEL</span>
              </h1>

              <p className="mb-8 mt-5 text-sm text-gray-400 sm:text-base lg:w-4/5">
                HighPixel é um projeto de alto nível focado na plataforma SA-MP,
                oferecendo aspectos únicos que o diferenciam de outros servidores
                do mesmo segmento. Somos todos gamers, então entendemos as
                necessidades e como atendê-las. Trazemos a experiência, a
                dedicação e a paixão para tornar o HighPixel uma experiência
                única.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button className="w-full rounded-lg bg-[#D60620] px-6 py-3 font-medium text-black transition hover:bg-[#FF0726] sm:w-auto">
                  Download Launcher
                </button>
                <button className="w-full rounded-lg border border-white bg-transparent px-6 py-3 font-medium text-white transition hover:bg-white/10 sm:w-auto">
                  Entrar no Discord
                </button>
              </div>
            </div>

            {/* Personagem */}
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] xl:w-[700px]">
              <Image
                src="/person.png"
                alt="character"
                width={1135}
                height={833}
                className="h-auto w-full object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </main>

        {/* Barra inferior */}
        <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#D60620] to-[#E60654]" />
      </div>
    );
  }
