"use client";

import Image from "next/image";
import { Bell, Search } from "lucide-react";
import arrow from "../../../../public/arrow.svg";
import avatar from "../../../../public/avatar.jpg";
import money from "../../../../public/money.svg";
import { Logo } from "./logo";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: any;
  transparent?: boolean;
}

export const Header = ({ isAuthenticated, user, transparent }: HeaderProps) => {
  return (
    <div
      className={`flex items-center justify-between px-10 py-4 font-poppins text-sm text-zinc-300 ${
        transparent 
          ? "border-none bg-transparent backdrop-blur-sm" 
          : "border-b-[1px] border-[#CED4D9]/20 bg-[#1b1c21]"
      }`}
    >
      <div>
        <Logo size={50} logo={2}/>
      </div>
      
      <div className="flex items-center gap-8">
        <h4 className="cursor-pointer transition hover:text-zinc-50">Home</h4>
        <h4 className="cursor-pointer transition hover:text-zinc-50">Discover</h4>
        <h4 className="cursor-pointer transition hover:text-zinc-50">Marketplace</h4>
        <h4 className="cursor-pointer transition hover:text-zinc-50">Suporte</h4>
        <h4 className="cursor-pointer transition hover:text-zinc-50">Premium</h4>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Search className="size-5 cursor-pointer transition hover:text-white" />
          <Image src={money} alt="money" className="cursor-pointer" />
          <Bell className="size-5 cursor-pointer transition hover:text-white" />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium">Julio Developer</h3>
          <Image src={avatar} alt="avatar" className="h-11 w-11 rounded-full object-cover" />
          <button className="transition hover:opacity-80">
            <Image src={arrow} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};