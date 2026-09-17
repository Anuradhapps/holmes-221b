"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Search,
  ShieldAlert,
} from "lucide-react";

const cases = [
  {
    id: 27,
    title: "The Missing Sapphire",
    description:
      "A valuable sapphire disappeared from a Mayfair residence under unusual circumstances.",
    status: "Investigating",
    priority: "Critical",
    location: "Mayfair",
    updated: "12 minutes ago",
  },
  {
    id: 31,
    title: "The Baker Street Letter",
    description:
      "An anonymous letter containing a coded warning was delivered to 221B Baker Street.",
    status: "Urgent",
    priority: "Urgent",
    location: "221B Baker Street",
    updated: "18 minutes ago",
  },
  {
    id: 42,
    title: "The Red-Headed Visitor",
    description:
      "A mysterious visitor has been observed near Westminster with conflicting identities.",
    status: "Waiting",
    priority: "Important",
    location: "Westminster",
    updated: "1 hour ago",
  },
  {
    id: 19,
    title: "The Silver Pocket Watch",
    description:
      "A missing pocket watch connects several witnesses across Whitechapel.",
    status: "Investigating",
    priority: "Important",
    location: "Whitechapel",
    updated: "2 hours ago",
  },
  {
    id: 8,
    title: "The Vanishing Musician",
    description:
      "A musician disappeared after an evening performance in Soho.",
    status: "Waiting",
    priority: "Routine",
    location: "Soho",
    updated: "Yesterday",
  },
  {
    id: 14,
    title: "The Blue Room",
    description:
      "A closed investigation involving an unexplained incident in Kensington.",
    status: "Closed",
    priority: "Routine",
    location: "Kensington",
    updated: "3 days ago",
  },
];

const filters = [
  "All",
  "Investigating",
  "Urgent",
  "Waiting",
  "Closed",
];

function priorityClass(priority: string) {
  switch (priority) {
    case "Urgent":
      return "border-red-500/20 bg-red-500/10 text-red-400";
    case "Critical":
      return "border-amber-500/20 bg-amber-500/10 text-amber-400";
    case "Important":
      return "border-blue-500/20 bg-blue-500/10 text-blue-400";
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-400";
  }
}

function statusClass(status: string) {
  switch (status) {
    case "Urgent":
      return "text-red-400";
    case "Investigating":
      return "text-amber-400";
    case "Waiting":
      return "text-blue-400";
    default:
      return "text-zinc-500";
  }
}

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.status === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        String(item.id).includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Heading */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
          Investigation Archive
        </p>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="font-serif text-3xl text-zinc-100 sm:text-4xl">
              Cases
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Review active investigations, priorities, locations and case
              progress from one workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total Cases" value="6" />
        <Stat label="Investigating" value="2" />
        <Stat label="Urgent" value="1" alert />
        <Stat label="Waiting" value="2" />
      </section>

      {/* Search and filters */}
      <section className="space-y-3">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases, locations or case numbers..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-amber-600/50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-lg border px-4 py-2 text-xs transition ${
                  active
                    ? "border-amber-600/30 bg-amber-600/10 text-amber-400"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Case grid */}
      {filteredCases.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((item) => (
            <Link
              key={item.id}
              href={`/cases/${item.id}`}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-zinc-600">
                    CASE #{String(item.id).padStart(2, "0")}
                  </p>

                  <h2 className="mt-2 font-serif text-xl text-zinc-100 group-hover:text-amber-400">
                    {item.title}
                  </h2>
                </div>

                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] ${priorityClass(
                    item.priority,
                  )}`}
                >
                  {item.priority}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 flex-1 text-sm leading-6 text-zinc-500">
                {item.description}
              </p>

              {/* Meta */}
              <div className="mt-5 space-y-2 border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-zinc-500">
                    <MapPin size={13} />
                    {item.location}
                  </span>

                  <span
                    className={`text-xs font-medium ${statusClass(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600">
                    Updated {item.updated}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-zinc-600 transition group-hover:text-amber-500">
                    Open
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-dashed border-zinc-800 py-16 text-center">
          <BriefcaseBusiness
            size={28}
            className="mx-auto text-zinc-700"
          />

          <h2 className="mt-4 font-serif text-lg text-zinc-300">
            No cases found
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Try another search term or filter.
          </p>
        </section>
      )}

      {/* UX insight */}
      <section className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-5">
        <div className="flex gap-3">
          <ShieldAlert
            size={18}
            className="mt-0.5 shrink-0 text-amber-500"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
              Investigation workflow
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Priority indicators help Holmes identify urgent work before
              reviewing lower-priority investigations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  alert = false,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        alert
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-zinc-800 bg-zinc-900/60"
      }`}
    >
      <p className="text-xs text-zinc-500">{label}</p>

      <p
        className={`mt-2 font-mono text-2xl ${
          alert ? "text-red-400" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}