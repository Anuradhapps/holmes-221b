"use client";

import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Check,
  Clock3,
  X,
} from "lucide-react";

type ScheduleEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  location: string;
  category: string;
  priority: string;
};

type ConflictModalProps = {
  conflict: {
    existingEvent: ScheduleEvent;
    newEvent: ScheduleEvent;
  } | null;
  onClose: () => void;
  onAcceptBoth: () => void;
  onCancelNew: () => void;
  onReschedule: () => void;
};

export default function ConflictModal({
  conflict,
  onClose,
  onAcceptBoth,
  onCancelNew,
  onReschedule,
}: ConflictModalProps) {
  if (!conflict) return null;

  const start = timeToMinutes(conflict.existingEvent.start);
  const end = timeToMinutes(conflict.existingEvent.end);
  const newStart = timeToMinutes(conflict.newEvent.start);
  const newEnd = timeToMinutes(conflict.newEvent.end);

  const overlapStart = Math.max(start, newStart);
  const overlapEnd = Math.min(end, newEnd);
  const overlapMinutes = Math.max(0, overlapEnd - overlapStart);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="border-b border-zinc-800 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
                    Schedule Intelligence
                  </p>

                  <h2 className="mt-1 font-serif text-2xl text-zinc-100">
                    Schedule conflict detected
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-100"
                  aria-label="Close"
                >
                  <X size={19} />
                </button>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                The proposed investigation overlaps with an existing event.
                Review the conflict before updating your schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Conflict duration */}
        <div className="border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
            <Clock3 size={18} className="text-amber-500" />

            <div>
              <p className="text-sm font-medium text-zinc-200">
                {overlapMinutes} minute overlap
              </p>

              <p className="mt-0.5 text-xs text-zinc-500">
                {formatMinutes(overlapStart)} —{" "}
                {formatMinutes(overlapEnd)}
              </p>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="grid gap-3 p-6 sm:grid-cols-2">
          <EventCard
            label="Existing event"
            event={conflict.existingEvent}
            muted
          />

          <EventCard
            label="New investigation"
            event={conflict.newEvent}
            urgent
          />
        </div>

        {/* Actions */}
        <div className="border-t border-zinc-800 bg-zinc-900/40 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
            Choose an action
          </p>

          <div className="space-y-2">
            <button
              onClick={onReschedule}
              className="flex w-full items-center justify-between rounded-xl border border-amber-600/30 bg-amber-600/10 p-4 text-left transition hover:bg-amber-600/15"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <CalendarClock size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-100">
                    Reschedule existing event
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    Move the existing event to another available time.
                  </p>
                </div>
              </div>

              <ArrowRight size={17} className="text-amber-500" />
            </button>

            <button
              onClick={onAcceptBoth}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-800 p-4 text-left transition hover:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                  <Check size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Accept both events
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    Keep both events despite the overlap.
                  </p>
                </div>
              </div>

              <ArrowRight size={17} className="text-zinc-600" />
            </button>

            <button
              onClick={onCancelNew}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-800 p-4 text-left transition hover:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500">
                  <X size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Cancel new investigation
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    Keep the current schedule unchanged.
                  </p>
                </div>
              </div>

              <ArrowRight size={17} className="text-zinc-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({
  label,
  event,
  muted = false,
  urgent = false,
}: {
  label: string;
  event: ScheduleEvent;
  muted?: boolean;
  urgent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        urgent
          ? "border-red-500/20 bg-red-500/[0.04]"
          : "border-zinc-800 bg-zinc-900/60"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
          urgent ? "text-red-400" : "text-zinc-600"
        }`}
      >
        {label}
      </p>

      <h3
        className={`mt-2 text-sm font-medium ${
          muted ? "text-zinc-300" : "text-zinc-100"
        }`}
      >
        {event.title}
      </h3>

      <div className="mt-3 space-y-1 text-xs text-zinc-500">
        <p>
          {event.start} — {event.end}
        </p>

        <p>{event.location}</p>
      </div>
    </div>
  );
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0",
  )}`;
}