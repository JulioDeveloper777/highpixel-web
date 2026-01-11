"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  backHref?: string;
  children?: React.ReactNode;
};

export const GeneralHeader = ({ backHref = "/", children }: Props) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <Link href={backHref} className="rounded-full border p-2">
        <ChevronLeft />
      </Link>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default GeneralHeader;
