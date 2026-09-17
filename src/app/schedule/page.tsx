"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import AddEventModal from "@/src/components/schedule/AddEventModal";
import ConflictModal from "@/src/components/schedule/ConflictModal";

import type { ScheduleEvent } from "@/src/types/schedule";

const initialEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "Breakfast & Newspaper Review",
    start: "08:00",
    end: "09:00",
    location: "221B Baker Street",
    category: "Personal",
    priority: "Routine",
  },
  {
    id: 2,
    title: "Study: London Morning Papers",
    start: "09:00",
    end: "10:00",
    location: "221B Baker Street",
    category: "Research",
    priority: "Routine",
  },
  {
    id: 3,
    title: "Client Consultation",
    start: "10:30",
    end: "11:30",
    location: "221B Baker Street",
    category: "Case",
    priority: "Important",
  },
  {
    id: 4,
    title: "Meeting with Inspector Lestrade",
    start: "12:00",
    end: "13:00",
    location: "Scotland Yard",
    category: "Scotland Yard",
    priority: "Important",
  },
  {
    id: 5,
    title: "Lunch",
    start: "13:30",
    end: "14:00",
    location: "221B Baker Street",
    category: "Personal",
    priority: "Routine",
  },
  {
    id: 6,
    title: "Evidence Analysis — Case #27",
    start: "14:00",
    end: "15:30",
    location: "221B Baker Street",
    category: "Case",
    priority: "Critical",
  },
  {
    id: 7,
    title: "Crime Scene Investigation",
    start: "16:30",
    end: "18:00",
    location: "Whitechapel",
    category: "Investigation",
    priority: "Urgent",
  },
  {
    id: 8,
    title: "Case Notes & Deduction",
    start: "20:00",
    end: "21:00",
    location: "221B Baker Street",
    category: "Research",
    priority: "Important",
  },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);

  const [showAddModal, setShowAddModal] = useState(false);

  const [conflict, setConflict] = useState<{
    existingEvent: ScheduleEvent;
    newEvent: ScheduleEvent;
  } | null>(null);

  const [rescheduling, setRescheduling] =
    useState<ScheduleEvent | null>(null);

  function handleAddEvent(newEvent: ScheduleEvent) {
    const overlappingEvent = events.find((event) =>
      eventsOverlap(event, newEvent),
    );

    if (overlappingEvent) {
      setConflict({
        existingEvent: overlappingEvent,
        newEvent,
      });

      setShowAddModal(false);
      return;
    }

    setEvents((current) => [...current, newEvent]);
    setShowAddModal(false);
  }

  function handleAcceptBoth() {
    if (!conflict) return;

    setEvents((current) => [...current, conflict.newEvent]);
    setConflict(null);
  }

  function handleCancelNew() {
    setConflict(null);
  }

  function handleStartReschedule() {
    if (!conflict) return;

    setRescheduling(conflict.existingEvent);
    setConflict(null);
  }

  function handleRescheduleConfirm(
    start: string,
    end: string,
  ) {
    if (!rescheduling || !conflict) return;

    const updatedExistingEvent = {
      ...rescheduling,
      start,
      end,
    };

    const stillConflicts = events.some((event) => {
      if (event.id === rescheduling.id) return false;

      return eventsOverlap(event, updatedExistingEvent);
    });

    if (stillConflicts) {
      alert(
        "The selected time conflicts with another event. Please choose another time.",
      );
      return;
    }

    const updatedEvents = events.map((event) =>
      event.id === rescheduling.id
        ? updatedExistingEvent
        : event,
    );

    setEvents([...updatedEvents, conflict.newEvent]);
    setRescheduling(null);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Daily Planning
          </p>

          <h1 className="font-serif text-3xl text-zinc-100 sm:text-4xl">
            Schedule
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Thursday · 17 September 2026
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-500"
        >
          <Plus size={17} />
          Add Event
        </button>
      </section>

      {/* Date navigation */}
      <section className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
        <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-100">
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <CalendarDays size={16} className="text-amber-500" />
          Thursday, 17 September
        </div>

        <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-100">
          <ChevronRight size={18} />
        </button>
      </section>

      {/* Timeline */}
      <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
        <div className="border-b border-zinc-800 px-5 py-4">
          <h2 className="font-serif text-xl text-zinc-100">
            Today&apos;s Events
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            {events.length} scheduled events
          </p>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {events
            .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start))
            .map((event) => (
              <div
                key={event.id}
                className="group flex gap-4 px-5 py-5 transition hover:bg-zinc-900"
              >
                <div className="w-16 shrink-0">
                  <p className="font-mono text-xs text-zinc-400">
                    {event.start}
                  </p>

                  <p className="mt-1 font-mono text-[10px] text-zinc-600">
                    {event.end}
                  </p>
                </div>

                <div className="h-auto w-px bg-zinc-800" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-200">
                        {event.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={12} />
                          {event.start} — {event.end}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} />
                          {event.location}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-2 py-0.5 text-[10px] ${
                        event.priority === "Urgent"
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : event.priority === "Critical"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : event.priority === "Important"
                              ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                              : "border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {event.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Add Event */}
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddEvent}
        />
      )}

      {/* Conflict */}
      {conflict && (
        <ConflictModal
          conflict={conflict}
          onClose={() => setConflict(null)}
          onAcceptBoth={handleAcceptBoth}
          onCancelNew={handleCancelNew}
          onReschedule={handleStartReschedule}
        />
      )}

      {/* Reschedule */}
      {rescheduling && (
        <RescheduleModal
          event={rescheduling}
          onClose={() => setRescheduling(null)}
          onConfirm={handleRescheduleConfirm}
        />
      )}
    </div>
  );
}

function RescheduleModal({
  event,
  onClose,
  onConfirm,
}: {
  event: ScheduleEvent;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
}) {
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-500">
              Reschedule
            </p>

            <h2 className="mt-1 font-serif text-xl text-zinc-100">
              Move existing event
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm font-medium text-zinc-200">
              {event.title}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Select a new available time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-zinc-500">
              Start
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-600"
              />
            </label>

            <label className="text-xs text-zinc-500">
              End
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-600"
              />
            </label>
          </div>

          <button
            onClick={() => onConfirm(start, end)}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-amber-500"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function eventsOverlap(
  first: ScheduleEvent,
  second: ScheduleEvent,
) {
  const firstStart = timeToMinutes(first.start);
  const firstEnd = timeToMinutes(first.end);

  const secondStart = timeToMinutes(second.start);
  const secondEnd = timeToMinutes(second.end);

  return firstStart < secondEnd && secondStart < firstEnd;
}