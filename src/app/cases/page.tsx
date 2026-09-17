"use client";

import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  Clock3,
  MapPin,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";

const cases = [
  {
    id: "27",
    title: "The Missing Sapphire",
    description:
      "A valuable sapphire disappeared from a locked study in Mayfair.",
    status: "Investigating",
    priority: "Critical",
    location: "Mayfair",
    updated: "12 minutes ago",
  },
  {
    id: "31",
    title: "The Baker Street Letter",
    description:
      "An anonymous letter containing an unusual cipher was delivered to 221B.",
    status: "Urgent",
    priority: "Urgent",
    location: "221B Baker Street",
    updated: "28 minutes ago",
  },
  {
    id: "42",
    title: "The Red-Headed Visitor",
    description:
      "A suspicious visitor has been observed repeatedly near a client's residence.",
    status: "Waiting",
    priority: "Important",
    location: "Westminster",
    updated: "1 hour ago",
  },
  {
    id: "19",
    title: "The Silver Pocket Watch",
    description:
      "A pocket watch discovered at a crime scene may identify the missing suspect.",
    status: "Investigating",
    priority: "Important",
    location: "Whitechapel",
    updated: "3 hours ago",
  },
  {
    id: "08",
    title: "The Vanishing Musician",
    description:
      "A London musician disappeared shortly before an important performance.",
    status: "Waiting",
    priority: "Routine",
    location: "Soho",
    updated: "Yesterday",
  },
  {
    id: "14",
    title: "The Blue Room",
    description:
      "A locked-room mystery involving a wealthy London family.",
    status: "Closed",
    priority: "Routine",
    location: "Kensington",
    updated: "2 days ago",
  },
];

const filters = ["All", "Investigating", "Urgent", "Waiting", "Closed"];

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-widest text-amber-500">
            Intelligence Archive
          </p>

          <h1 className="mt-2 font-serif text-4xl text-zinc-100">
            Cases
          </h1>

          <p className="mt-2 max-w-2xl text-zinc-500">
            Manage investigations, evidence, suspects, and deductions.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-500">
          <Plus size={18} />
          New Case
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">

        <StatCard
          label="Total Cases"
          value="6"
        />

        <StatCard
          label="Investigating"
          value="2"
        />

        <StatCard
          label="Urgent"
          value="1"
        />

        <StatCard
          label="Waiting"
          value="2"
        />

      </div>

      {/* Search + Filters */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

        <div className="flex flex-col gap-4 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cases, locations, or descriptions..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
            />
          </div>

          {/* Filter icon */}
          <div className="hidden items-center gap-2 border-l border-zinc-800 pl-4 text-sm text-zinc-500 lg:flex">
            <Filter size={17} />
            Filter
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition ${
                  filter === item
                    ? "bg-amber-600 text-white"
                    : "border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Results */}
      <div className="space-y-3">

        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {filteredCases.length} case
            {filteredCases.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredCases.map((item) => (
          <Link
            key={item.id}
            href={`/cases/${item.id}`}
            className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex gap-5">

              {/* Case Number */}
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-sm text-amber-500 sm:flex">
                #{item.id}
              </div>

              <div className="min-w-0 flex-1">

                {/* Title + Priority */}
                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div>
                    <p className="mb-1 text-xs text-amber-500 sm:hidden">
                      CASE #{item.id}
                    </p>

                    <h2 className="font-serif text-xl text-zinc-100">
                      {item.title}
                    </h2>
                  </div>

                  <PriorityBadge priority={item.priority} />

                </div>

                {/* Description */}
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
                  {item.description}
                </p>

                {/* Metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-zinc-500">

                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {item.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={14} />
                    Updated {item.updated}
                  </span>

                  <span className="rounded-full border border-zinc-800 px-2.5 py-1">
                    {item.status}
                  </span>

                </div>

              </div>

              <div className="hidden items-center text-zinc-600 transition group-hover:text-amber-500 sm:flex">
                <ChevronRight size={20} />
              </div>

            </div>
          </Link>
        ))}

        {filteredCases.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
            <AlertTriangle className="mx-auto text-zinc-600" size={28} />

            <h2 className="mt-4 font-serif text-xl text-zinc-300">
              No cases found
            </h2>

            <p className="mt-2 text-sm text-zinc-600">
              Try another search term or change the filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold text-zinc-100">
        {value}
      </p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const isUrgent =
    priority === "Urgent" || priority === "Critical";

  return (
    <span
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
        isUrgent
          ? "border-red-900/50 bg-red-950/30 text-red-400"
          : "border-zinc-800 text-zinc-500"
      }`}
    >
      {isUrgent && <AlertTriangle size={12} />}
      {priority}
    </span>
  );
}