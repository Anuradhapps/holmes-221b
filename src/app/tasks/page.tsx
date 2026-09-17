"use client";

import {
  Check,
  Clock3,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

type Task = {
  id: number;
  title: string;
  caseNumber: string;
  priority: "Routine" | "Important" | "Critical" | "Urgent";
  due: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Examine muddy footprint",
    caseNumber: "#27",
    priority: "Critical",
    due: "Today · 11:30",
    completed: false,
  },
  {
    id: 2,
    title: "Review witness statement",
    caseNumber: "#31",
    priority: "Urgent",
    due: "Today · 13:00",
    completed: false,
  },
  {
    id: 3,
    title: "Compare glove fabric with evidence",
    caseNumber: "#27",
    priority: "Important",
    due: "Today · 15:30",
    completed: false,
  },
  {
    id: 4,
    title: "Send report to Inspector Lestrade",
    caseNumber: "#42",
    priority: "Important",
    due: "Tomorrow · 09:00",
    completed: false,
  },
  {
    id: 5,
    title: "Archive previous case notes",
    caseNumber: "#19",
    priority: "Routine",
    due: "Friday · 10:00",
    completed: true,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  }

  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm uppercase tracking-widest text-amber-500">
            Investigation Work
          </p>

          <h1 className="mt-2 font-serif text-4xl text-zinc-100">
            Tasks
          </h1>

          <p className="mt-2 text-zinc-500">
            Keep track of actions required across active investigations.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-medium text-white hover:bg-amber-500">
          <Plus size={18} />
          New Task
        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <Stat
          title="Total Tasks"
          value={String(tasks.length)}
        />

        <Stat
          title="Remaining"
          value={String(remaining)}
        />

        <Stat
          title="Completed"
          value={String(completed)}
        />

      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-11 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
        />
      </div>

      {/* Tasks */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">

        <div className="border-b border-zinc-800 p-6">
          <h2 className="font-serif text-xl text-zinc-100">
            Investigation Tasks
          </h2>
        </div>

        <div className="divide-y divide-zinc-800">

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center gap-4 p-5 transition hover:bg-zinc-900 ${
                task.completed ? "opacity-50" : ""
              }`}
            >

              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                  task.completed
                    ? "border-amber-600 bg-amber-600 text-white"
                    : "border-zinc-700 hover:border-amber-600"
                }`}
              >
                {task.completed && <Check size={15} />}
              </button>

              {/* Task */}
              <div className="min-w-0 flex-1">

                <p
                  className={`text-sm font-medium ${
                    task.completed
                      ? "text-zinc-500 line-through"
                      : "text-zinc-200"
                  }`}
                >
                  {task.title}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-600">

                  <span>
                    Case {task.caseNumber}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {task.due}
                  </span>

                </div>

              </div>

              {/* Priority */}
              <Priority priority={task.priority} />

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-zinc-700 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}

        </div>

      </section>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-semibold text-zinc-100">
        {value}
      </p>
    </div>
  );
}

function Priority({
  priority,
}: {
  priority: Task["priority"];
}) {
  const urgent =
    priority === "Urgent" ||
    priority === "Critical";

  return (
    <span
      className={`hidden rounded-full border px-3 py-1 text-xs sm:block ${
        urgent
          ? "border-red-900/50 bg-red-950/20 text-red-400"
          : "border-zinc-800 text-zinc-500"
      }`}
    >
      {priority}
    </span>
  );
}