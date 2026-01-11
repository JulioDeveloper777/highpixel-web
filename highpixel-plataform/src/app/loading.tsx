"use client";

import { Logo } from "@/app/components/ui/logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="animate-pulse">
        <Logo logo={1} size={100} />
      </div>
    </div>
  );
}
