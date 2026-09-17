"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100 md:hidden"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <p className="hidden text-sm text-zinc-500 sm:block">
              Thursday, September 17, 2026
            </p>

            <p className="text-xs text-zinc-500 sm:hidden">
              Thursday · 17 Sep 2026
            </p>

            <h2 className="mt-1 truncate font-serif text-lg text-zinc-100 sm:text-2xl">
              Good morning, Mr. Holmes.
            </h2>
          </div>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          {/* Search */}
          <button
            className="hidden text-zinc-400 transition hover:text-zinc-100 sm:block"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 border-l border-zinc-800 pl-2 sm:pl-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 font-serif text-sm text-amber-500">
              SH
            </div>

            <div className="hidden sm:block">
              <p className="text-sm text-zinc-200">
                Sherlock Holmes
              </p>

              <p className="text-xs text-zinc-500">
                Consulting Detective
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
}