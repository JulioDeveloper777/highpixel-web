"use client";

import socialRepository from "@/repositories/social-repository";
import { Button, Card, CardBody, CardHeader, User } from "@heroui/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const TimelineSuggestionsSidebar = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await socialRepository.searchProfiles("", 1, 5, true);
        if (!mounted) return;
        setSuggestions(res.data || []);
      } catch (e) {
        console.error("Error loading suggestions", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFollowToggle = async (slug: string, index: number) => {
    try {
      const item = suggestions[index];
      if (!item) return;
      if (item.isFollowing) {
        await socialRepository.unfollow(slug);
      } else {
        await socialRepository.follow(slug);
      }
      const copy = [...suggestions];
      copy[index] = { ...item, isFollowing: !item.isFollowing };
      setSuggestions(copy);
    } catch (e) {
      console.error("Follow error", e);
    }
  };

  return (
    <aside className="hidden w-full space-y-4 lg:w-80 xl:block">
      <Card className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21]">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-bold text-muted-foreground">
            Sugestões para seguir
          </h2>
        </CardHeader>
        <CardBody className="gap-4 pt-0">
          {loading && (
            <div className="text-sm text-gray-400">Carregando...</div>
          )}
          {!loading &&
            suggestions.map((user, i) => (
              <div
                key={user.id || user.userid || i}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <User
                    name={user.username || user.name}
                    description={user.subtitle}
                    avatarProps={{
                      src: user.avatar || user.avatar_url || "/avatar.jpg",
                      size: "sm",
                      classNames: {
                        base: "ring-2 ring-transparent hover:ring-primary/30 transition-all",
                      },
                    }}
                    classNames={{ name: "text-sm font-bold text-foreground" }}
                  />
                  {user.isVerified && user.badges && (
                    <Image
                      src={user.badges[0]}
                      width={20}
                      height={20}
                      alt="verified"
                      className="ml-1 h-5 w-5"
                    />
                  )}
                </div>
                <Button
                  variant={user.isFollowing ? "flat" : "bordered"}
                  size="sm"
                  onClick={() =>
                    handleFollowToggle(user.slug || user.userid || user.id, i)
                  }
                  className="h-7 flex-shrink-0 border-[#fc2c44] px-3 text-xs hover:border-danger hover:text-primary"
                >
                  {user.isFollowing ? "Seguindo" : "Seguir"}
                </Button>
              </div>
            ))}
        </CardBody>
      </Card>

      <Card className="relative overflow-hidden rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21]">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
        <CardBody className="relative z-10">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-primary">
            <span className="text-2xl">🚀</span>
            BETA
          </h3>

          <p className="mb-4 text-sm leading-relaxed">
            O que você está achando da versão Beta? Conte para gente e ajude na
            construção desse espaço
          </p>

          <Button
            color="danger"
            className="w-full font-medium shadow-lg transition-all hover:shadow-2xl"
            endContent={<ExternalLink className="h-4 w-4" />}
          >
            ENVIAR FEEDBACK
          </Button>
        </CardBody>
      </Card>
    </aside>
  );
};
