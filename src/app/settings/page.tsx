"use client";

import {
  Bell,
  CalendarClock,
  Check,
  Moon,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [conflicts, setConflicts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-widest text-amber-500">
          System Configuration
        </p>

        <h1 className="mt-2 font-serif text-4xl text-zinc-100">
          Settings
        </h1>

        <p className="mt-2 text-zinc-500">
          Configure your Holmes Intelligence System.
        </p>
      </div>

      {/* Profile */}
      <SettingsSection
        icon={<User size={19} />}
        title="Profile"
        description="Personal information used throughout the system."
      >
        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 font-serif text-xl text-amber-500">
            SH
          </div>

          <div>
            <p className="text-lg text-zinc-200">
              Sherlock Holmes
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Consulting Detective
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              221B Baker Street, London
            </p>
          </div>

        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={<Bell size={19} />}
        title="Notifications"
        description="Control investigation and schedule alerts."
      >
        <Toggle
          label="Investigation notifications"
          description="Receive alerts when new investigation requests arrive."
          enabled={notifications}
          onChange={() => setNotifications(!notifications)}
        />

        <Toggle
          label="Schedule conflict detection"
          description="Warn me when newly added events overlap existing events."
          enabled={conflicts}
          onChange={() => setConflicts(!conflicts)}
        />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection
        icon={<Moon size={19} />}
        title="Appearance"
        description="Adjust how information is presented."
      >
        <Toggle
          label="Compact schedule"
          description="Reduce spacing between schedule events."
          enabled={compactMode}
          onChange={() => setCompactMode(!compactMode)}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        icon={<Shield size={19} />}
        title="Privacy & Security"
        description="Control access to your investigation information."
      >
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm text-zinc-300">
            Investigation records are protected.
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Only authorized users can access case information.
          </p>
        </div>
      </SettingsSection>

      {/* Save */}
      <div className="flex justify-end border-t border-zinc-800 pt-6">
        <button className="flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 text-sm font-medium text-white hover:bg-amber-500">
          <Check size={17} />
          Save Preferences
        </button>
      </div>

    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">

      <div className="flex gap-4 border-b border-zinc-800 p-6">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-950/30 text-amber-500">
          {icon}
        </div>

        <div>
          <h2 className="font-serif text-xl text-zinc-100">
            {title}
          </h2>

          <p className="mt-1 text-sm text-zinc-600">
            {description}
          </p>
        </div>

      </div>

      <div className="space-y-5 p-6">
        {children}
      </div>

    </section>
  );
}

function Toggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5">

      <div>
        <p className="text-sm text-zinc-300">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-600">
          {description}
        </p>
      </div>

      <button
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-amber-600"
            : "bg-zinc-800"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}