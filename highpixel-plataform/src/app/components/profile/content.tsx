"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button-nxt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PostFromUserProfile } from "./post";

const posts = [
  {
    id: 1,
    avatar: "/avatar.jpg",
    author: "Júlio",
    handle: "@juliodeveloper",
    time: "há 3 semanas",
    content:
      "Alguém pode me dar alguma idéia de vídeo para postar sobre a cidade ? quero divulgar o máximo possível essa obra prima.",
    likes: 2,
    commentsCount: 2,
    comments: [
      {
        id: 1,
        avatar: "https://cdn.discordapp.com/avatars/1259074306227306599/ca2f72c164547cea705ab42f5fc23502.png?size=2048",
        author: "Anderson",
        handle: "@anderson.bussiniss",
        content:
          "Se quiser algo mais complexo, depois de um tempo pode tentar trabalhar de reporter, nada melhor que já fazer roleplay e criar conteúdo para o teu canal.",
        time: "há 3 semanas",
      },
      {
        id: 2,
        author: "Gabriel",
        avatar: "https://cdn.discordapp.com/avatars/1055923332920393760/63f7c5586c12c3d6292e6cf03404a872.png?size=2048",
        handle: "@whoissanches",
        content:
          "Faz um video explicando sobre o servidor, mostrando como ele ira funcionar, spoilers etc! Abraços",
        time: "há 3 semanas",
      },
    ],
  },
];

export const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="flex-1 space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-auto justify-start rounded-none border-b border-[#CED4D9]/20 bg-transparent p-0">
          <TabsTrigger
            value="details"
            className="rounded-none pb-3 data-[state=active]:border-b-2 data-[state=active]:border-[#D60620]"
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="rounded-none pb-3 data-[state=active]:border-b-2 data-[state=active]:border-[#D60620]"
          >
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <div className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Sobre Mim</h2>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-[#CED4D9]/20 bg-[#1b1c21]">
              <p className="text-sm text-muted-foreground">
                Clique para criar um &rdquo;Sobre Mim&rdquo; personalizado
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6 space-y-4">
          {posts.map((post) => (
            <PostFromUserProfile key={post.id} {...post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
