"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <div>
        <p className="text-sm text-zinc-500">Thursday, September 17, 2026</p>

        <h2 className="mt-1 font-serif text-2xl text-zinc-100">
          Good morning, Mr. Holmes.
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-zinc-400 hover:text-zinc-100">
          <Search size={20} />
        </button>

        <button className="relative text-zinc-400 hover:text-zinc-100">
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-zinc-800 pl-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 font-serif text-sm text-amber-500">
            SH
          </div>

          <div className="hidden sm:block">
            <p className="text-sm text-zinc-200">Sherlock Holmes</p>
            <p className="text-xs text-zinc-500">Detective</p>
          </div>
        </div>
      </div>
    </header>
  );
}