"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  Check,
  ChevronRight,
  Clock3,
  Info,
} from "lucide-react";
import { useState } from "react";

type Notification = {
  id: number;
  type: "urgent" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
  href?: string;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "urgent",
    title: "Urgent investigation received",
    message:
      "Inspector Lestrade has requested immediate assistance with a new investigation.",
    time: "09:42",
    read: false,
    href: "/cases/31",
  },
  {
    id: 2,
    type: "warning",
    title: "Schedule conflict detected",
    message:
      "The new Scotland Yard investigation overlaps with Evidence Analysis at 14:00.",
    time: "09:45",
    read: false,
    href: "/schedule",
  },
  {
    id: 3,
    type: "info",
    title: "Case evidence updated",
    message:
      "New evidence has been added to The Missing Sapphire.",
    time: "08:56",
    read: true,
    href: "/cases/27",
  },
  {
    id: 4,
    type: "info",
    title: "Task completed",
    message:
      "Review of the London morning papers has been marked complete.",
    time: "08:30",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unread = notifications.filter(
    (item) => !item.read
  ).length;

  function markRead(id: number) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  }

  function markAllRead() {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm uppercase tracking-widest text-amber-500">
            Intelligence Centre
          </p>

          <h1 className="mt-2 font-serif text-4xl text-zinc-100">
            Notifications
          </h1>

          <p className="mt-2 text-zinc-500">
            Important events, investigation updates, and system alerts.
          </p>
        </div>

        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
          >
            <Check size={16} />
            Mark all as read
          </button>
        )}

      </div>

      {/* Unread */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-900/30 bg-amber-950/10 p-5">

        <Bell className="text-amber-500" size={20} />

        <p className="text-sm text-zinc-400">
          You have{" "}
          <span className="font-medium text-amber-500">
            {unread}
          </span>{" "}
          unread notification{unread !== 1 ? "s" : ""}.
        </p>

      </div>

      {/* Notifications */}
      <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">

        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={() => markRead(notification.id)}
          />
        ))}

      </section>

    </div>
  );
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: () => void;
}) {
  const content = (
    <div
      onClick={onRead}
      className={`group flex gap-4 border-b border-zinc-800 p-6 transition last:border-0 hover:bg-zinc-900 ${
        !notification.read
          ? "bg-zinc-900/70"
          : ""
      }`}
    >

      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          notification.type === "urgent"
            ? "bg-red-950/40 text-red-400"
            : notification.type === "warning"
              ? "bg-amber-950/40 text-amber-500"
              : "bg-zinc-800 text-zinc-400"
        }`}
      >
        {notification.type === "urgent" ? (
          <AlertTriangle size={19} />
        ) : notification.type === "warning" ? (
          <CalendarClock size={19} />
        ) : (
          <Info size={19} />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-start justify-between gap-3">

          <h2
            className={`text-sm font-medium ${
              notification.read
                ? "text-zinc-400"
                : "text-zinc-100"
            }`}
          >
            {notification.title}
          </h2>

          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          )}

        </div>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {notification.message}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
          <Clock3 size={13} />
          {notification.time}
        </div>

      </div>

      {notification.href && (
        <ChevronRight
          size={18}
          className="mt-2 shrink-0 text-zinc-700 transition group-hover:text-amber-500"
        />
      )}

    </div>
  );

  if (notification.href) {
    return (
      <Link href={notification.href}>
        {content}
      </Link>
    );
  }

  return content;
}