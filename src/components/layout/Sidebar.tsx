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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600 font-serif text-lg font-bold">
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
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-500">
          <Search size={16} />
          <span>Search</span>
          <span className="ml-auto text-xs">⌘K</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-amber-600/10 text-amber-500"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  );
}