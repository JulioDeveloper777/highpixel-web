"use client";

import {HeroUIProvider} from '@heroui/react'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroUIProvider>{children}</HeroUIProvider>
    </>
  );
}
