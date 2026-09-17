"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Network,
  Search,
  ShieldAlert,
  User,
} from "lucide-react";

type Suspect = {
  name: string;
  role: string;
  risk: "Low" | "Medium" | "High";
};

type Evidence = {
  title: string;
  type: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
};

type CaseData = {
  id: string;
  title: string;
  status: string;
  priority: "Routine" | "Important" | "Critical" | "Urgent";
  location: string;
  updated: string;
  image: string;
  summary: string;
  progress: number;
  suspects: Suspect[];
  evidence: Evidence[];
  deduction: string;
};

const cases: Record<string, CaseData> = {
  "27": {
    id: "27",
    title: "The Missing Sapphire",
    status: "Investigating",
    priority: "Critical",
    location: "Mayfair",
    updated: "12 minutes ago",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A valuable sapphire disappeared from a locked study during a private gathering in Mayfair. The room shows signs of forced entry, but several observations suggest the window may have been opened from inside.",
    progress: 68,
    suspects: [
      {
        name: "Lord Harrington",
        role: "Property Owner",
        risk: "Medium",
      },
      {
        name: "Mrs. Whitmore",
        role: "Housekeeper",
        risk: "High",
      },
      {
        name: "James Bell",
        role: "Personal Assistant",
        risk: "Low",
      },
    ],
    evidence: [
      {
        title: "Broken Window",
        type: "Physical Evidence",
        description:
          "Window glass was found inside the room rather than outside.",
        confidence: "High",
      },
      {
        title: "Muddy Footprint",
        type: "Trace Evidence",
        description:
          "A partial footprint was discovered near the study entrance.",
        confidence: "Medium",
      },
      {
        title: "Torn Glove",
        type: "Physical Evidence",
        description:
          "A piece of dark fabric was found underneath the study desk.",
        confidence: "Medium",
      },
    ],
    deduction: "The window was likely opened from inside the room.",
  },

  "31": {
    id: "31",
    title: "The Baker Street Letter",
    status: "Urgent",
    priority: "Urgent",
    location: "221B Baker Street",
    updated: "18 minutes ago",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Inspector Lestrade has requested immediate assistance after a coded letter was delivered to 221B Baker Street. The message appears to reference an ongoing investigation and contains an unidentified sequence of numbers.",
    progress: 34,
    suspects: [
      {
        name: "Unknown Sender",
        role: "Letter Author",
        risk: "High",
      },
      {
        name: "John Turner",
        role: "Possible Associate",
        risk: "Medium",
      },
      {
        name: "Mrs. Hudson",
        role: "Resident",
        risk: "Low",
      },
    ],
    evidence: [
      {
        title: "Coded Letter",
        type: "Document",
        description:
          "A handwritten letter containing a repeated numerical sequence.",
        confidence: "High",
      },
      {
        title: "Red Wax Seal",
        type: "Physical Evidence",
        description:
          "The envelope carries a partially damaged red wax seal.",
        confidence: "Medium",
      },
      {
        title: "Unidentified Numbers",
        type: "Cipher",
        description:
          "The sequence may correspond to dates, addresses, or a substitution cipher.",
        confidence: "Medium",
      },
    ],
    deduction:
      "The numerical sequence may contain information about the next planned incident.",
  },

  "42": {
    id: "42",
    title: "The Red-Headed Visitor",
    status: "Waiting",
    priority: "Important",
    location: "Westminster",
    updated: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A suspicious visitor with distinctive red hair was reported near Westminster after meeting an unidentified government official. Further witness information is required before the investigation can proceed.",
    progress: 21,
    suspects: [
      {
        name: "The Red-Headed Visitor",
        role: "Primary Person of Interest",
        risk: "Medium",
      },
      {
        name: "Unknown Official",
        role: "Possible Contact",
        risk: "Medium",
      },
      {
        name: "Thomas Reed",
        role: "Witness",
        risk: "Low",
      },
    ],
    evidence: [
      {
        title: "Witness Statement",
        type: "Testimony",
        description:
          "A witness reported seeing the visitor near Westminster shortly after noon.",
        confidence: "Medium",
      },
      {
        title: "Travel Receipt",
        type: "Document",
        description:
          "A receipt places a person matching the description in the Westminster area.",
        confidence: "Medium",
      },
      {
        title: "Meeting Location",
        type: "Observation",
        description:
          "The visitor was reportedly seen entering a government building.",
        confidence: "Low",
      },
    ],
    deduction:
      "The visitor may have been attempting to establish contact with someone inside the government district.",
  },
};

function priorityClass(priority: CaseData["priority"]) {
  if (priority === "Urgent") {
    return "border-red-500/30 bg-red-500/10 text-red-400";
  }

  if (priority === "Critical") {
    return "border-amber-500/30 bg-amber-500/10 text-amber-400";
  }

  if (priority === "Important") {
    return "border-blue-500/30 bg-blue-500/10 text-blue-400";
  }

  return "border-zinc-700 bg-zinc-900 text-zinc-400";
}

function riskClass(risk: Suspect["risk"]) {
  if (risk === "High") return "text-red-400";
  if (risk === "Medium") return "text-amber-400";
  return "text-emerald-400";
}

export default function CaseDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const caseData = cases[id] ?? cases["27"];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Back */}
      <Link
        href="/cases"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-100"
      >
        <ArrowLeft size={16} />
        Back to Cases
      </Link>

      {/* Header */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">
                CASE #{caseData.id}
              </span>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${priorityClass(
                  caseData.priority
                )}`}
              >
                {caseData.priority}
              </span>

              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400">
                {caseData.status}
              </span>
            </div>

            <h1 className="font-serif text-3xl text-zinc-100 sm:text-4xl">
              {caseData.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} />
                {caseData.location}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                Updated {caseData.updated}
              </span>
            </div>
          </div>

          <Link
            href={`/deduction-board?case=${caseData.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-600/30 bg-amber-600/10 px-4 py-2.5 text-sm font-medium text-amber-500 transition hover:bg-amber-600/20"
          >
            <Network size={16} />
            Open Deduction Board
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <img
          src={caseData.image}
          alt={caseData.title}
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Main */}
        <div className="space-y-6">
          {/* Summary */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Search size={18} className="text-amber-500" />
              <h2 className="font-serif text-xl text-zinc-100">
                Investigation Summary
              </h2>
            </div>

            <p className="text-sm leading-7 text-zinc-400">
              {caseData.summary}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  Investigation Progress
                </span>

                <span className="text-sm font-medium text-amber-500">
                  {caseData.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${caseData.progress}%` }}
                />
              </div>
            </div>
          </section>

          {/* Evidence */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="font-serif text-xl text-zinc-100">Evidence</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Collected observations and physical evidence.
              </p>
            </div>

            <div className="space-y-3">
              {caseData.evidence.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-medium text-zinc-200">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-zinc-500">
                        {item.type}
                      </p>
                    </div>

                    <span className={`text-xs ${riskClass(item.confidence)}`}>
                      {item.confidence} confidence
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suspects */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="font-serif text-xl text-zinc-100">Persons of Interest</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Individuals currently connected to the case.
              </p>
            </div>

            <div className="space-y-3">
              {caseData.suspects.map((suspect) => (
                <div
                  key={suspect.name}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
                    <User size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {suspect.name}
                    </p>

                    <p className="truncate text-xs text-zinc-500">
                      {suspect.role}
                    </p>
                  </div>

                  <span className={`text-xs ${riskClass(suspect.risk)}`}>
                    {suspect.risk}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Deduction Assistant */}
          <section className="rounded-2xl border border-amber-600/20 bg-amber-600/5 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-600/10 text-amber-500">
                <Network size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                  Deduction Assistant
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {caseData.deduction}
                </p>
              </div>
            </div>
          </section>

          {/* Critical Alert */}
          {caseData.priority === "Urgent" ||
          caseData.priority === "Critical" ? (
            <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="flex gap-3">
                <ShieldAlert
                  size={20}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <div>
                  <h3 className="text-sm font-medium text-red-400">
                    Immediate Attention Required
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    This case has been marked {caseData.priority.toLowerCase()}.
                    Review related evidence and schedule your next investigative
                    action.
                  </p>

                  <Link
                    href="/schedule"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300"
                  >
                    Review Schedule
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}