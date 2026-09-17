"use client";

import {
  Clock3,
  MapPin,
  Navigation,
  Search,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

const locations = [
  {
    id: 1,
    name: "221B Baker Street",
    type: "Home & Office",
    address: "Baker Street, London",
    description:
      "Primary residence, laboratory, and investigation workspace.",
    visits: "Today",
    favorite: true,
  },
  {
    id: 2,
    name: "Scotland Yard",
    type: "Police",
    address: "Victoria Embankment, London",
    description:
      "Regular meeting location for consultations with Inspector Lestrade.",
    visits: "Today",
    favorite: true,
  },
  {
    id: 3,
    name: "Mayfair",
    type: "Crime Scene",
    address: "Mayfair, London",
    description:
      "Current location associated with Case #27 — The Missing Sapphire.",
    visits: "Today",
    favorite: false,
  },
  {
    id: 4,
    name: "Whitechapel",
    type: "Crime Scene",
    address: "Whitechapel, London",
    description:
      "Investigation location connected to the current crime scene visit.",
    visits: "Today",
    favorite: false,
  },
  {
    id: 5,
    name: "Westminster",
    type: "Client",
    address: "Westminster, London",
    description:
      "Client location associated with Case #42.",
    visits: "Tomorrow",
    favorite: false,
  },
  {
    id: 6,
    name: "Kensington",
    type: "Archive",
    address: "Kensington, London",
    description:
      "Previous investigation location.",
    visits: "Previous",
    favorite: false,
  },
];

const filters = [
  "All",
  "Home & Office",
  "Police",
  "Crime Scene",
  "Client",
  "Archive",
];

export default function LocationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState(
    locations
      .filter((location) => location.favorite)
      .map((location) => location.id)
  );

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        location.address
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        location.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || location.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-widest text-amber-500">
          London Field Operations
        </p>

        <h1 className="mt-2 font-serif text-4xl text-zinc-100">
          Locations
        </h1>

        <p className="mt-2 max-w-2xl text-zinc-500">
          Frequently visited locations, investigation sites, and
          operational destinations.
        </p>
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
          placeholder="Search locations..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-11 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition ${
              filter === item
                ? "bg-amber-600 text-white"
                : "border border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Current location */}
      <section className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-900/20 text-amber-500">
              <Navigation size={21} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-amber-600">
                Current Base
              </p>

              <h2 className="mt-1 font-serif text-xl text-zinc-100">
                221B Baker Street
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Home & Office · London
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Clock3 size={14} />
            Next departure: 12:00
          </div>

        </div>

      </section>

      {/* Location cards */}
      <div className="grid gap-4 md:grid-cols-2">

        {filteredLocations.map((location) => {
          const isFavorite = favorites.includes(location.id);

          return (
            <div
              key={location.id}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-amber-500">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      {location.type}
                    </p>

                    <h2 className="mt-1 font-serif text-xl text-zinc-100">
                      {location.name}
                    </h2>
                  </div>

                </div>

                <button
                  onClick={() => toggleFavorite(location.id)}
                  className={`transition ${
                    isFavorite
                      ? "text-amber-500"
                      : "text-zinc-700 hover:text-amber-500"
                  }`}
                >
                  <Star
                    size={18}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>

              </div>

              <div className="mt-5 border-t border-zinc-800 pt-4">

                <p className="text-sm text-zinc-400">
                  {location.address}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {location.description}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="flex items-center gap-2 text-xs text-zinc-600">
                    <Clock3 size={13} />
                    {location.visits}
                  </span>

                  <button className="text-xs text-amber-500 opacity-0 transition group-hover:opacity-100">
                    View details →
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {filteredLocations.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
          <MapPin
            size={28}
            className="mx-auto text-zinc-700"
          />

          <h2 className="mt-4 font-serif text-xl text-zinc-300">
            No locations found
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Try a different search or category.
          </p>
        </div>
      )}

    </div>
  );
}