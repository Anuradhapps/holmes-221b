"use client";

import { AlertTriangle, CalendarClock, X } from "lucide-react";

type Event = {
  time: string;
  end: string;
  title: string;
  location: string;
  category: string;
  priority: string;
};

type ConflictModalProps = {
  existingEvent: Event;
  newEvent: Event;
  onReschedule: () => void;
  onAcceptBoth: () => void;
  onCancel: () => void;
};

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getOverlap(existing: Event, incoming: Event) {
  const start = Math.max(
    timeToMinutes(existing.time),
    timeToMinutes(incoming.time)
  );

  const end = Math.min(
    timeToMinutes(existing.end),
    timeToMinutes(incoming.end)
  );

  return Math.max(0, end - start);
}

export default function ConflictModal({
  existingEvent,
  newEvent,
  onReschedule,
  onAcceptBoth,
  onCancel,
}: ConflictModalProps) {
  const overlap = getOverlap(existingEvent, newEvent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-red-900/50 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-950/50 text-red-400">
              <AlertTriangle size={22} />
            </div>

            <div>
              <h2 className="font-serif text-2xl text-zinc-100">
                Schedule Conflict Detected
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Two events overlap in your schedule.
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conflict Information */}
        <div className="space-y-4 p-6">

          {/* Existing event */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
              <CalendarClock size={14} />
              Existing Event
            </div>

            <h3 className="font-serif text-lg text-zinc-100">
              {existingEvent.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span>
                {existingEvent.time} – {existingEvent.end}
              </span>

              <span>{existingEvent.location}</span>
            </div>
          </div>

          {/* New event */}
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/10 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-500">
              <AlertTriangle size={14} />
              New Event
            </div>

            <h3 className="font-serif text-lg text-zinc-100">
              {newEvent.title}
            </h3>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span>
                {newEvent.time} – {newEvent.end}
              </span>

              <span>{newEvent.location}</span>
            </div>
          </div>

          {/* Explanation */}
          <div className="rounded-lg border border-red-900/30 bg-red-950/20 p-4">
            <p className="text-sm text-red-300">
              These events overlap by{" "}
              <span className="font-semibold">
                {overlap} minutes
              </span>
              .
            </p>

            <p className="mt-1 text-xs text-red-400/70">
              Holmes's schedule requires attention before this investigation
              can be added.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-zinc-800 p-6">
          <p className="mb-4 text-sm text-zinc-500">
            How would you like to resolve this conflict?
          </p>

          <div className="grid gap-3 sm:grid-cols-3">

            <button
              onClick={onReschedule}
              className="rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-amber-500"
            >
              Reschedule Existing
            </button>

            <button
              onClick={onAcceptBoth}
              className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Accept Both
            </button>

            <button
              onClick={onCancel}
              className="rounded-lg border border-zinc-800 px-4 py-3 text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-300"
            >
              Cancel New Event
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}