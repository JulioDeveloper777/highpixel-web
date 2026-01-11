"use client";

import { adminRepository } from "@/repositories/admin-repository";
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardTitle } from "../ui/card";

export const TimelineSidebar = () => {
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminRepository.listTrending();
        setTrending(res || []);
      } catch (err) {
        setTrending([]);
      }
    })();
  }, []);

  return (
    <aside className="hidden w-full space-y-4 lg:block lg:w-96">
      <Card className="relative overflow-hidden rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21]">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>
        <CardBody className="relative">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-bold">Atualizações</h2>
            <span className="text-xl">🎮🔥</span>
          </div>

          <h3 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-bold leading-tight text-transparent">
            A OpenBeta está chegando e você não vai ficar de fora né?
          </h3>
        </CardBody>
      </Card>

      <Card className="rounded-lg border border-[#CED4D9]/20 bg-[#1b1c21] p-4">
        <CardTitle className="mb-3 text-xl font-bold">
          O que está bombando?
        </CardTitle>
        <CardBody className="gap-4">
          {trending.map((channel) => (
            <div key={channel.id} className="flex items-center gap-3">
              <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded bg-secondary">
                {channel.thumbnail ? (
                  <Image
                    src={channel.thumbnail}
                    alt={channel.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="truncate text-sm font-bold">
                    {channel.name}
                  </span>
                  {channel.badge && (
                    <Image
                      src={"/verify.png"}
                      width={20}
                      height={20}
                      alt="verified"
                      className="ml-1 h-5 w-5"
                    />
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {channel.subtitle}
                </p>
              </div>

              <Button
                variant="bordered"
                size="sm"
                className="h-7 flex-shrink-0 border-[#fc2c44] px-3 text-xs hover:border-danger hover:text-primary"
              >
                ASSISTIR
              </Button>
            </div>
          ))}
        </CardBody>
      </Card>
    </aside>
  );
};
