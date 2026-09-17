"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  FileText,
  MapPin,
  Network,
  Search,
  UserRound,
} from "lucide-react";

const caseData = {
  "27": {
    number: "#27",
    title: "The Missing Sapphire",
    status: "Investigating",
    priority: "Critical",
    location: "Mayfair",
    updated: "12 minutes ago",
    summary:
      "A valuable sapphire disappeared from a locked study in Mayfair. There were no obvious signs of forced entry, suggesting that the person responsible may have had access to the property.",
    suspects: [
      {
        name: "Lord Harrington",
        role: "Property Owner",
        confidence: "Medium",
      },
      {
        name: "Mrs. Whitmore",
        role: "Housekeeper",
        confidence: "High",
      },
      {
        name: "James Bell",
        role: "Personal Assistant",
        confidence: "Low",
      },
    ],
    evidence: [
      {
        title: "Broken window",
        description: "Glass fragments found inside the study.",
      },
      {
        title: "Muddy footprint",
        description: "Partial footprint discovered near the desk.",
      },
      {
        title: "Torn glove",
        description: "Small piece of dark fabric recovered from the window.",
      },
    ],
  },
};

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <CaseContent params={params} />
  );
}

async function CaseContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const currentCase =
    caseData[id as keyof typeof caseData] ?? caseData["27"];

  return (
    <div className="space-y-8">

      {/* Back */}
      <Link
        href="/cases"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-100"
      >
        <ArrowLeft size={16} />
        Back to Cases
      </Link>

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-amber-500">
              CASE {currentCase.number}
            </span>

            <span className="rounded-full border border-amber-900/50 bg-amber-950/20 px-3 py-1 text-xs text-amber-500">
              {currentCase.status}
            </span>

            <span className="rounded-full border border-red-900/50 bg-red-950/20 px-3 py-1 text-xs text-red-400">
              {currentCase.priority}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-4xl text-zinc-100">
            {currentCase.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <MapPin size={15} />
              {currentCase.location}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={15} />
              Updated {currentCase.updated}
            </span>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 px-5 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white">
          <BriefcaseBusiness size={17} />
          Case Actions
        </button>

      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

        {/* Left */}
        <div className="space-y-6">

          {/* Summary */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">

            <div className="flex items-center gap-3 border-b border-zinc-800 p-6">
              <FileText size={19} className="text-amber-500" />

              <h2 className="font-serif text-xl text-zinc-100">
                Case Summary
              </h2>
            </div>

            <div className="p-6">
              <p className="text-sm leading-7 text-zinc-400">
                {currentCase.summary}
              </p>
            </div>

          </section>

          {/* Evidence */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">

            <div className="flex items-center justify-between border-b border-zinc-800 p-6">
              <div className="flex items-center gap-3">
                <Search size={19} className="text-amber-500" />

                <h2 className="font-serif text-xl text-zinc-100">
                  Evidence
                </h2>
              </div>

              <span className="text-xs text-zinc-600">
                {currentCase.evidence.length} items
              </span>
            </div>

            <div className="divide-y divide-zinc-800">

              {currentCase.evidence.map((evidence) => (
                <div
                  key={evidence.title}
                  className="p-6 transition hover:bg-zinc-900"
                >
                  <h3 className="text-sm font-medium text-zinc-200">
                    {evidence.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {evidence.description}
                  </p>
                </div>
              ))}

            </div>
          </section>

          {/* Deduction Board */}
          <section className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-6">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-900/20 text-amber-500">
                <Network size={21} />
              </div>

              <div className="flex-1">
                <h2 className="font-serif text-xl text-zinc-100">
                  Deduction Board
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Connect evidence, suspects, observations, and deductions
                  to uncover relationships within this investigation.
                </p>

                <Link
                  href={`/deduction-board?case=${currentCase.number.replace("#", "")}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-500"
                >
                  Open Deduction Board
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>

          </section>

        </div>

        {/* Right */}
        <aside className="space-y-6">

          {/* Suspects */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">

            <div className="flex items-center gap-3 border-b border-zinc-800 p-6">
              <UserRound size={19} className="text-amber-500" />

              <h2 className="font-serif text-xl text-zinc-100">
                Suspects
              </h2>
            </div>

            <div className="divide-y divide-zinc-800">

              {currentCase.suspects.map((suspect) => (
                <div
                  key={suspect.name}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {suspect.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        {suspect.role}
                      </p>
                    </div>

                    <span className="text-xs text-zinc-500">
                      {suspect.confidence}
                    </span>

                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Investigation status */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">

            <p className="text-xs uppercase tracking-widest text-zinc-600">
              Investigation Progress
            </p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[68%] rounded-full bg-amber-600" />
            </div>

            <div className="mt-3 flex justify-between text-xs">
              <span className="text-zinc-500">
                Evidence collected
              </span>

              <span className="text-amber-500">
                68%
              </span>
            </div>

          </section>

        </aside>

      </div>
    </div>
  );
}