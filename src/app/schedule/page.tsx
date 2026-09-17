"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
} from "lucide-react";

import { useState } from "react";
import AddEventModal from "@/src/components/schedule/AddEventModal";
import ConflictModal from "@/src/components/schedule/ConflictModal";

type ScheduleEvent = {
  time: string;
  end: string;
  title: string;
  location: string;
  category: string;
  priority: string;
};

const initialEvents: ScheduleEvent[] = [
  {
    time: "08:00",
    end: "09:00",
    title: "Breakfast & Newspaper Review",
    location: "221B Baker Street",
    category: "Personal",
    priority: "Routine",
  },
  {
    time: "09:00",
    end: "10:00",
    title: "Study: London Morning Papers",
    location: "221B Baker Street",
    category: "Research",
    priority: "Important",
  },
  {
    time: "10:30",
    end: "11:30",
    title: "Client Consultation",
    location: "221B Baker Street",
    category: "Case",
    priority: "Important",
  },
  {
    time: "12:00",
    end: "13:00",
    title: "Meeting with Inspector Lestrade",
    location: "Scotland Yard",
    category: "Scotland Yard",
    priority: "Important",
  },
  {
    time: "13:30",
    end: "14:00",
    title: "Lunch",
    location: "221B Baker Street",
    category: "Personal",
    priority: "Routine",
  },
  {
    time: "14:00",
    end: "15:30",
    title: "Evidence Analysis — Case #27",
    location: "221B Baker Street",
    category: "Investigation",
    priority: "Critical",
  },
  {
    time: "16:30",
    end: "18:00",
    title: "Crime Scene Investigation",
    location: "Whitechapel",
    category: "Investigation",
    priority: "Urgent",
  },
  {
    time: "20:00",
    end: "21:30",
    title: "Case Notes & Deduction",
    location: "221B Baker Street",
    category: "Investigation",
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

  function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function eventsOverlap(first: ScheduleEvent, second: ScheduleEvent) {
    const firstStart = timeToMinutes(first.time);
    const firstEnd = timeToMinutes(first.end);

    const secondStart = timeToMinutes(second.time);
    const secondEnd = timeToMinutes(second.end);

    return firstStart < secondEnd && secondStart < firstEnd;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-amber-500">
              Thursday · 17 September 2026
            </p>

            <h1 className="mt-2 font-serif text-4xl text-zinc-100">
              Daily Schedule
            </h1>

            <p className="mt-2 text-zinc-500">
              Your appointments, investigations and personal activities.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-500"
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <p className="text-sm text-zinc-500">Thursday</p>

            <p className="font-serif text-xl text-zinc-100">
              September 17, 2026
            </p>
          </div>

          <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Schedule */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
          <div className="divide-y divide-zinc-800">
            {events.map((event) => (
              <ScheduleEvent
                key={`${event.time}-${event.title}`}
                {...event}
              />
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newEvent) => {
            const conflictingEvent = events.find((existingEvent) =>
              eventsOverlap(existingEvent, newEvent)
            );

            if (conflictingEvent) {
              setConflict({
                existingEvent: conflictingEvent,
                newEvent,
              });

              setShowAddModal(false);
              return;
            }

            setEvents((current) => [...current, newEvent]);
            setShowAddModal(false);
          }}
        />
      )}

      {conflict && (
        <ConflictModal
          existingEvent={conflict.existingEvent}
          newEvent={conflict.newEvent}
          onReschedule={() => {
            setConflict(null);
            setShowAddModal(true);
          }}
          onAcceptBoth={() => {
            setEvents((current) => [...current, conflict.newEvent]);
            setConflict(null);
          }}
          onCancel={() => {
            setConflict(null);
          }}
        />
      )}
    </>
  );
}

function ScheduleEvent({
  time,
  end,
  title,
  location,
  category,
  priority,
}: {
  time: string;
  end: string;
  title: string;
  location: string;
  category: string;
  priority: string;
}) {
  const priorityStyle = {
    Routine: "text-zinc-500",
    Important: "text-amber-500",
    Critical: "text-orange-400",
    Urgent: "text-red-400",
  }[priority];

  return (
    <div className="group flex min-h-24 gap-5 p-5 transition hover:bg-zinc-900">
      {/* Time */}
      <div className="w-20 shrink-0">
        <p className="font-mono text-sm font-medium text-amber-500">{time}</p>

        <p className="mt-1 text-xs text-zinc-600">{end}</p>
      </div>

      {/* Event */}
      <div className="flex-1 border-l border-zinc-800 pl-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-medium text-zinc-100">{title}</h3>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {location}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 size={13} />
                {category}
              </span>
            </div>
          </div>

          <span className={`text-xs font-medium ${priorityStyle}`}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}