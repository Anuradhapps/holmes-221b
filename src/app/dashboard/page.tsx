import {
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseBusiness,
  AlertTriangle,
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
    title: "Evidence Analysis",
    location: "221B Baker Street",
    priority: "Critical",
  },
  {
    time: "16:30",
    title: "Crime Scene Visit",
    location: "Whitechapel",
    priority: "Urgent",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-widest text-amber-500">
          Thursday · 17 September 2026
        </p>

        <h1 className="mt-2 font-serif text-4xl text-zinc-100">
          Today's Intelligence
        </h1>

        <p className="mt-2 text-zinc-500">
          Your schedule and investigations at a glance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Today's Events"
          value="8"
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          title="Active Cases"
          value="3"
          icon={<BriefcaseBusiness size={20} />}
        />

        <StatCard
          title="Next Event"
          value="10:30"
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="Urgent"
          value="1"
          icon={<AlertTriangle size={20} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="border-b border-zinc-800 p-6">
            <h2 className="font-serif text-xl text-zinc-100">
              Today's Schedule
            </h2>
          </div>

          <div className="divide-y divide-zinc-800">
            {schedule.map((event) => (
              <div
                key={event.time}
                className="flex gap-5 p-5 transition hover:bg-zinc-900"
              >
                <div className="w-14 shrink-0 font-mono text-sm text-amber-500">
                  {event.time}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-medium text-zinc-100">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                    <MapPin size={13} />
                    {event.location}
                  </div>
                </div>

                <span className="hidden text-xs text-zinc-500 sm:block">
                  {event.priority}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-400" size={20} />

              <h2 className="font-medium text-red-300">
                Urgent Investigation
              </h2>
            </div>

            <p className="mt-4 font-serif text-lg text-zinc-100">
              Assistance requested by Inspector Lestrade.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Scotland Yard · Received 09:42
            </p>

            <button className="mt-5 w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500">
              Review Case
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-serif text-xl text-zinc-100">
              Active Cases
            </h2>

            <div className="mt-5 space-y-4">
              <CaseItem
                number="#27"
                title="The Missing Sapphire"
                status="Investigating"
              />

              <CaseItem
                number="#31"
                title="The Baker Street Letter"
                status="Urgent"
              />

              <CaseItem
                number="#42"
                title="The Red-Headed Visitor"
                status="Waiting"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{title}</p>

        <div className="text-amber-500">{icon}</div>
      </div>

      <p className="mt-3 text-3xl font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

function CaseItem({
  number,
  title,
  status,
}: {
  number: string;
  title: string;
  status: string;
}) {
  return (
    <div className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between gap-3">
        <div>
          <p className="text-xs text-amber-500">{number}</p>
          <p className="mt-1 text-sm text-zinc-200">{title}</p>
        </div>

        <span className="text-xs text-zinc-500">{status}</span>
      </div>
    </div>
  );
}