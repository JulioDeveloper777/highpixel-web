"use client";

import { Progress } from "@heroui/react";
import Image from "next/image";

type Props = {
  value: number; 
};

export const ProgressStatus = ({ value }: Props) => {
  return (
    <div className="relative w-full">
      <Progress
        aria-label="Progress"
        value={value}
        classNames={{
          base: "w-full h-2 rounded-full bg-neutral-800",
          indicator:
            "bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all duration-300",
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: `calc(${value}% - 12px)`, 
        }}
      >
        <Image
          src="/party-popper.png"
          alt="Confetti"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};
