import FooterLogin from "@/app/components/signin/footer-login";
import FormLogin from "@/app/components/signin/form-login";
import { Header } from "@/app/components/ui/header";
import Image from "next/image";

export default function Login() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <Header />
      
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/coroa.png"
          alt="Coroa decorativa"
          width={150}
          height={150}
          quality={100}
          className="absolute top-20 right-2 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"
        />
        
        <Image
          src="/raio.png"
          alt="Raio decorativo"
          width={150}
          height={150}
          quality={100}
          className="absolute bottom-20 left-2 w-16 sm:w-20 md:w-28 lg:w-36 xl:w-40"
        />
      </div>
      
      <main className="relative flex flex-1 items-center justify-center px-4 sm:px-6 md:px-10">
        <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl p-6 backdrop-blur-sm sm:p-8">
          <FormLogin />
          <FooterLogin />
        </div>
      </main>
    </div>
  );
}