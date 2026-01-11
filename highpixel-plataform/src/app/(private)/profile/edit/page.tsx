"use client";

import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "../../../../data/user";
import { GeneralHeader } from "../../../components/timeline/ui/general-header";
import { AvatarUser } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { TextArea } from "../../../components/ui/textarea";

export default function Page() {
  return (
    <div className="w-screen text-white lg:max-w-xl">
      <GeneralHeader backHref="/profile">
        <div className="text-lg font-bold">Editar Perfil</div>
      </GeneralHeader>
      <section className="border-b-2 border-[#161616]">
        <div
          className="flex h-28 items-center justify-center gap-4 bg-gray-500 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(" + user.cover + ")" }}
        >
          <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/80">
            <FontAwesomeIcon icon={faCamera} className="size-6" />
          </div>
          <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/80">
            <FontAwesomeIcon icon={faXmark} className="size-6" />
          </div>
        </div>
        <div className="-mt-12 px-6">
          <div className="relative size-24">
            <AvatarUser
              src={user.avatar}
              isBorded={false}
              size="lg"
              className="h-24 w-24 object-cover"
            />
          </div>
          <div className="absolute -mt-24 flex size-24 items-center justify-center">
            <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/80">
              <FontAwesomeIcon icon={faCamera} className="size-6" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 p-6">
        <label htmlFor="">
          <p className="mb-2 text-lg text-gray-500">Nome</p>
          <Input
            placeholder="Digite seu nome"
            value={user.name}
            border={true}
          />
        </label>
        <label>
          <p className="mb-2 text-lg text-gray-500">Bio</p>
          <TextArea
            placeholder="Escreva uma biografia"
            rows={4}
            value={user.bio}
          />
        </label>
        <label>
          <p className="mb-2 text-lg text-gray-500">Link</p>
          <Input placeholder="Digite um Link" value={user.link} border={true} />
        </label>
        <Button label="Salvar alterações" size={1} background="white" />
      </section>
    </div>
  );
}
