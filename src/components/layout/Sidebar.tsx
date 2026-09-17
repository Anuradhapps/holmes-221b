"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BriefcaseBusiness,
  Network,
  CheckSquare,
  MapPin,
  Bell,
  Settings,
  Search,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Schedule", href: "/schedule", icon: CalendarDays },
  { name: "Cases", href: "/cases", icon: BriefcaseBusiness },
  { name: "Deduction Board", href: "/deduction-board", icon: Network },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Locations", href: "/locations", icon: MapPin },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-zinc-800 bg-zinc-950
          transition-transform duration-300
          md:static md:z-auto md:w-64 md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-6">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-600 font-serif text-lg font-bold text-zinc-950">
              221B
            </div>

            <div>
              <h1 className="font-serif text-lg text-zinc-100">
                Holmes
              </h1>

              <p className="text-xs text-zinc-500">
                Intelligence System
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-5">
          <button className="flex w-full items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-left text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-zinc-300">
            <Search size={16} />

            <span>Search</span>

            <span className="ml-auto rounded border border-zinc-700 px-1.5 py-0.5 text-[10px]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Intelligence
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5
                  text-sm transition-all
                  ${
                    active
                      ? "border border-amber-600/20 bg-amber-600/10 text-amber-500"
                      : "border border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={
                    active
                      ? "text-amber-500"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }
                />

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-zinc-800 p-3">
          <Link
            href="/settings"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm
              transition
              ${
                pathname === "/settings"
                  ? "bg-amber-600/10 text-amber-500"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }
            `}
          >
            <Settings size={18} />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}