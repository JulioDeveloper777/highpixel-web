import FooterLogin from "@/app/components/signin/footer-login";
import FormRegister from "@/app/components/signup/form-register";
import { Header } from "@/app/components/ui/header";
import Image from "next/image";

export default function Register() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[url('/background.svg')] bg-cover bg-center bg-no-repeat text-white">
      <Header />

      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/coroa.png"
          alt="Coroa decorativa"
          width={150}
          height={150}
          quality={100}
          className="absolute right-2 top-20 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"
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

        <div className="relative z-10 mx-5 mt-20 flex flex-col items-center justify-center gap-5">
          <div className="w-full max-w-md">
            <FormRegister />
          </div>
          <FooterLogin />
        </div>
    </div>
  );
}

/* <div className="relative z-10 mx-5 mt-20 flex flex-col items-center justify-center gap-5">
        <div className="w-full max-w-md">
          <FormRegister />
        </div>
        <FooterLogin />
      </ */
