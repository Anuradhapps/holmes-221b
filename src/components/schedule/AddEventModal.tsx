"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Event = {
  time: string;
  end: string;
  title: string;
  location: string;
  category: string;
  priority: string;
};

type AddEventModalProps = {
  onClose: () => void;
  onAdd: (event: Event) => void;
};

export default function AddEventModal({
  onClose,
  onAdd,
}: AddEventModalProps) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("14:00");
  const [end, setEnd] = useState("15:00");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Routine");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      time: start,
      end,
      title,
      location: location || "221B Baker Street",
      category,
      priority,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <div>
            <h2 className="font-serif text-2xl text-zinc-100">
              Add New Event
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add an event to today's schedule.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Event Name
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Interview with witness"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Start
              </label>

              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                End
              </label>

              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-600"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Scotland Yard"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-600"
              >
                <option>Personal</option>
                <option>Case</option>
                <option>Investigation</option>
                <option>Research</option>
                <option>Scotland Yard</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-600"
              >
                <option>Routine</option>
                <option>Important</option>
                <option>Critical</option>
                <option>Urgent</option>
              </select>
            </div>

          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-500"
            >
              Add Event
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}