/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarGroup } from "@heroui/react";
import { Edit, HelpCircle, MapPin } from "lucide-react";
import { Button } from "../ui/button-nxt";

import Image from "next/image";
import { ProgressStatus } from "./progress-status";

export const ProfileSidebar = () => {
  return (
    <aside className="w-full space-y-4 lg:w-96">
      <div className="relative -mt-20 rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
        {/* Botão no canto superior direito */}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-[#2b2c31]">
          <Edit className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar
              src="https://cdn.discordapp.com/avatars/885158216101687307/c223e0f29f44bf1c195f271f254496d3.png?size=2048"
              name="Julio"
              size="lg"
              className="h-28 w-28"
              color="success"
              isBordered
            />
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="mt-3 flex items-center justify-center text-center">
              <h1 className="text-2xl font-bold">Júlio</h1>
              <Image
                src="/verify.png"
                width={28}
                height={28}
                alt="verified"
                className="ml-1"
              />
            </div>

            <p className="text-sm text-muted-foreground">@juliodeveloper</p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            "a melhor maneira de prever o futuro, é criá-lo"
          </p>

          <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Minas Gerais, Brasil</span>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            SINCE: SETEMBRO DE 2025
          </div>

          <div className="mt-5 flex items-center justify-center gap-5 text-sm">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <strong className="text-white">4</strong>
              <h5>Seguindo</h5>
            </div>
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <strong className="text-white">5</strong>
              <h5>Seguidores</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Insígnias</h2>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Este usuário ainda não possui insígnias.
        </p>
      </div>

      <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
        <h2 className="mb-4 font-bold">Status</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          <strong>@juliodeveloper</strong> foi aprovado e está aguardando pela
          entrevista.
        </p>
        <div className="relative">
          <ProgressStatus value={70} />
        </div>
      </div>

      <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Seguidores</h2>
          <span className="text-sm text-muted-foreground">5</span>
        </div>
        <div className="flex -space-x-2">
          <AvatarGroup isBordered color="danger">
              <Avatar
                src="https://cdn.discordapp.com/avatars/972140308248813578/30b86b807665464d7bee9ca8f6218195.png?size=2048"
                name="Carlos"
              />
              <Avatar
                src="https://cdn.discordapp.com/avatars/1055923332920393760/63f7c5586c12c3d6292e6cf03404a872.png?size=2048"
                name="Gabriel"
              />
              <Avatar
                src="https://cdn.discordapp.com/avatars/1259074306227306599/ca2f72c164547cea705ab42f5fc23502.png?size=2048"
                name="Anderson"
              />
              <Avatar
                src="https://cdn.discordapp.com/avatars/1138420027666727083/7b6a5ff5e0800e9b93a398fb3c24628d.png?size=2048"
                name="Nerysvan"
              />
              <Avatar
                src="https://cdn.discordapp.com/avatars/1432446084428599379/b063be61ba0aafc30518120f1fc8754f.png?size=2048"
                name="High Pixel"
              />
          </AvatarGroup>
        </div>
      </div>

      <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-primary">Últimas visitas</h2>
          <span className="text-sm text-muted-foreground">12</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <AvatarGroup isGrid>
            <Avatar
              src="https://cdn.discordapp.com/avatars/1432446084428599379/b063be61ba0aafc30518120f1fc8754f.png?size=2048"
              name="High Pixel"
            />
            <Avatar
              src="https://cdn.discordapp.com/avatars/1259074306227306599/ca2f72c164547cea705ab42f5fc23502.png?size=2048"
              name="Anderson"
            />
            <Avatar
              src="https://cdn.discordapp.com/avatars/1055923332920393760/63f7c5586c12c3d6292e6cf03404a872.png?size=2048"
              name="Gabriel"
            />
            <Avatar
              src="https://cdn.discordapp.com/avatars/972140308248813578/30b86b807665464d7bee9ca8f6218195.png?size=2048"
              name="Carlos"
            />
            <Avatar
              src="https://cdn.discordapp.com/avatars/1138420027666727083/7b6a5ff5e0800e9b93a398fb3c24628d.png?size=2048"
              name="Nerysvan"
            />
          </AvatarGroup>
        </div>
        <Button className="w-full bg-[#D60620] text-white hover:bg-[#D60620]/80">
          ⭐ Desbloquear Visitantes
        </Button>
      </div>
    </aside>
  );
};
