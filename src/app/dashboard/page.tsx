import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const schedule = [
  {
    time: "08:00",
    title: "Breakfast & Newspaper Review",
    location: "221B Baker Street",
    priority: "Routine",
  },
  {
    time: "10:30",
    title: "Client Consultation",
    location: "221B Baker Street",
    priority: "Important",
  },
  {
    time: "12:00",
    title: "Scotland Yard Meeting",
    location: "Scotland Yard",
    priority: "Important",
  },
  {
    time: "14:00",
    title: "Evidence Analysis — Case #27",
    location: "221B Baker Street",
    priority: "Critical",
  },
  {
    time: "16:30",
    title: "Crime Scene Investigation",
    location: "Whitechapel",
    priority: "Urgent",
  },
];

const cases = [
  {
    id: 27,
    title: "The Missing Sapphire",
    status: "Investigating",
    priority: "Critical",
  },
  {
    id: 31,
    title: "The Baker Street Letter",
    status: "Urgent",
    priority: "Urgent",
  },
  {
    id: 42,
    title: "The Red-Headed Visitor",
    status: "Waiting",
    priority: "Important",
  },
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

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page heading */}
      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
              221B Intelligence
            </p>

            <h1 className="font-serif text-3xl text-zinc-100 sm:text-4xl">
              Today&apos;s Intelligence
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Thursday · 17 September 2026
            </p>
          </div>

          <Link
            href="/schedule"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-amber-600/50 hover:text-amber-400"
          >
            <CalendarDays size={16} />
            View full schedule
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<CalendarDays size={18} />}
          label="Today&apos;s Events"
          value="8"
          detail="2 remaining"
        />

        <StatCard
          icon={<BriefcaseBusiness size={18} />}
          label="Active Cases"
          value="3"
          detail="1 urgent"
        />

        <StatCard
          icon={<Clock3 size={18} />}
          label="Next Event"
          value="10:30"
          detail="Client consultation"
        />

        <StatCard
          icon={<ShieldAlert size={18} />}
          label="Urgent"
          value="1"
          detail="Immediate action"
          alert
        />
      </section>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Schedule */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="font-serif text-xl text-zinc-100">
                Today&apos;s Schedule
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Your planned activities
              </p>
            </div>

            <Link
              href="/schedule"
              className="text-xs text-amber-500 hover:text-amber-400"
            >
              Manage
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {schedule.map((event, index) => (
              <div
                key={event.time}
                className="group flex gap-4 px-5 py-4 transition hover:bg-zinc-900"
              >
                <div className="w-14 shrink-0 pt-0.5">
                  <p className="font-mono text-xs text-zinc-500">
                    {event.time}
                  </p>
                </div>

                <div className="relative flex-1">
                  {index !== schedule.length - 1 && (
                    <span className="absolute -bottom-7 left-0 top-7 w-px bg-zinc-800" />
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-zinc-200">
                        {event.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin size={12} />
                        {event.location}
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityClass(
                        event.priority,
                      )}`}
                    >
                      {event.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-6">
          {/* Urgent case */}
          <section className="overflow-hidden rounded-xl border border-red-500/20 bg-red-950/10">
            <div className="border-b border-red-500/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <ShieldAlert size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">
                    Immediate attention
                  </p>

                  <h2 className="font-serif text-lg text-zinc-100">
                    Urgent Investigation
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm leading-6 text-zinc-300">
                  Assistance requested by Inspector Lestrade.
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span>Scotland Yard</span>
                  <span>•</span>
                  <span>Received 09:42</span>
                </div>
              </div>

              <Link
                href="/cases/31"
                className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300 transition hover:bg-red-500/10"
              >
                Review Case
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* Active cases */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <h2 className="font-serif text-xl text-zinc-100">
                  Active Cases
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Current investigations
                </p>
              </div>

              <Link
                href="/cases"
                className="text-xs text-amber-500 hover:text-amber-400"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {cases.map((item) => (
                <Link
                  key={item.id}
                  href={`/cases/${item.id}`}
                  className="block px-5 py-4 transition hover:bg-zinc-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] text-zinc-600">
                        CASE #{item.id}
                      </p>

                      <h3 className="mt-1 text-sm font-medium text-zinc-200">
                        {item.title}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] ${priorityClass(
                        item.priority,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Intelligence insight */}
          <section className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-5">
            <div className="flex gap-3">
              <Sparkles
                size={18}
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-500">
                  System observation
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Your 14:00 evidence analysis may conflict with the new
                  Scotland Yard investigation. The conflict assistant is
                  ready to review alternatives.
                </p>

                <Link
                  href="/schedule"
                  className="mt-3 inline-flex items-center gap-2 text-xs text-amber-500 hover:text-amber-400"
                >
                  Review schedule
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
  alert = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        alert
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-zinc-800 bg-zinc-900/60"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            alert
              ? "bg-red-500/10 text-red-400"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500">{label}</p>

      <div className="mt-1 flex items-end gap-2">
        <p
          className={`font-mono text-2xl ${
            alert ? "text-red-400" : "text-zinc-100"
          }`}
        >
          {value}
        </p>

        <p className="pb-0.5 text-[10px] text-zinc-600">{detail}</p>
      </div>
    </div>
  );
}