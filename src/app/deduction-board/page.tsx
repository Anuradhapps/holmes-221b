"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Brain,
  Check,
  ChevronRight,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

type NodeType = "Evidence" | "Observation" | "Suspect" | "Deduction";

type BoardNode = {
  id: number;
  type: NodeType;
  title: string;
  description: string;
};

const columns: NodeType[] = [
  "Evidence",
  "Observation",
  "Suspect",
  "Deduction",
];

const initialNodes: BoardNode[] = [
  {
    id: 1,
    type: "Evidence",
    title: "Broken Window",
    description:
      "Glass fragments were discovered inside the study rather than outside.",
  },
  {
    id: 2,
    type: "Evidence",
    title: "Muddy Footprint",
    description:
      "A partial footprint was discovered near the study entrance.",
  },
  {
    id: 3,
    type: "Evidence",
    title: "Torn Glove",
    description:
      "Dark fabric was found beneath the study desk.",
  },
  {
    id: 4,
    type: "Observation",
    title: "Window opened from inside",
    description:
      "The position of the broken glass suggests the window may have been opened internally.",
  },
  {
    id: 5,
    type: "Observation",
    title: "No external footprints",
    description:
      "No clear footprints were found immediately outside the study window.",
  },
  {
    id: 6,
    type: "Suspect",
    title: "Mrs. Whitmore",
    description:
      "Housekeeper with access to the property and study.",
  },
  {
    id: 7,
    type: "Suspect",
    title: "James Bell",
    description:
      "Personal assistant with access to the study.",
  },
  {
    id: 8,
    type: "Deduction",
    title: "Inside access likely",
    description:
      "The available evidence suggests the intruder may have entered through an internally opened window.",
  },
];

const columnDescriptions: Record<NodeType, string> = {
  Evidence: "Physical clues and collected material.",
  Observation: "What Holmes has directly established.",
  Suspect: "People connected to the investigation.",
  Deduction: "Conclusions derived from the available clues.",
};

export default function DeductionBoardPage() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("case") || "27";

  const [nodes, setNodes] = useState<BoardNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<BoardNode | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newType, setNewType] = useState<NodeType>("Evidence");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function deleteNode(id: number) {
    setNodes((current) => current.filter((node) => node.id !== id));
    setSelectedNode(null);
  }

  function addNode() {
    if (!newTitle.trim()) return;

    const newNode: BoardNode = {
      id: Date.now(),
      type: newType,
      title: newTitle.trim(),
      description:
        newDescription.trim() || "No additional information recorded.",
    };

    setNodes((current) => [...current, newNode]);

    setNewTitle("");
    setNewDescription("");
    setNewType("Evidence");
    setShowAddModal(false);
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href={`/cases/${caseId}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            Back to Case #{caseId}
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-600/20 bg-amber-600/10 text-amber-500">
              <Brain size={22} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
                Case Intelligence
              </p>

              <h1 className="font-serif text-3xl text-zinc-100">
                Deduction Board
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Organise evidence, observations, suspects and deductions to build
            a logical chain of reasoning.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-500"
        >
          <Plus size={17} />
          Add Intelligence
        </button>
      </div>

      {/* Case indicator */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-zinc-600">
          Active investigation
        </span>

        <Link
          href={`/cases/${caseId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400"
        >
          Case #{caseId}
          <ChevronRight size={14} />
        </Link>

        <span className="hidden text-zinc-700 sm:inline">•</span>

        <span className="text-sm text-zinc-500">
          {nodes.length} intelligence nodes
        </span>
      </div>

      {/* Board */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => {
          const columnNodes = nodes.filter(
            (node) => node.type === column
          );

          return (
            <section
              key={column}
              className="min-h-[420px] rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              {/* Column header */}
              <div className="mb-4 border-b border-zinc-800 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg text-zinc-100">
                    {column}
                  </h2>

                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 px-2 text-xs text-zinc-500">
                    {columnNodes.length}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  {columnDescriptions[column]}
                </p>
              </div>

              {/* Nodes */}
              <div className="space-y-3">
                {columnNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="group w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-left transition hover:-translate-y-0.5 hover:border-amber-600/40 hover:bg-zinc-950"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {node.title}
                        </p>

                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500">
                          {node.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        className="mt-0.5 shrink-0 text-zinc-700 transition group-hover:text-amber-500"
                      />
                    </div>
                  </button>
                ))}

                {columnNodes.length === 0 && (
                  <div className="rounded-xl border border-dashed border-zinc-800 p-6 text-center">
                    <p className="text-xs text-zinc-600">
                      No {column.toLowerCase()} recorded.
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Intelligence insight */}
      <section className="rounded-2xl border border-amber-600/20 bg-amber-600/5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-600/10 text-amber-500">
            <Brain size={19} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              Current deduction
            </p>

            <h3 className="mt-2 font-serif text-lg text-zinc-100">
              Inside access is currently the strongest hypothesis.
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
              The evidence and observations currently connected to this case
              suggest that the apparent external entry may have been staged.
              Further evidence is required before the deduction can be
              confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Node detail modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-500">
                  {selectedNode.type}
                </p>

                <h2 className="mt-1 font-serif text-xl text-zinc-100">
                  {selectedNode.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-7 text-zinc-400">
                {selectedNode.description}
              </p>

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <button
                  onClick={() => deleteNode(selectedNode.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                  Remove
                </button>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 hover:bg-white"
                >
                  <Check size={16} />
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-500">
                  New intelligence
                </p>

                <h2 className="mt-1 font-serif text-xl text-zinc-100">
                  Add Board Node
                </h2>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Intelligence Type
                </label>

                <select
                  value={newType}
                  onChange={(e) =>
                    setNewType(e.target.value as NodeType)
                  }
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-600"
                >
                  {columns.map((column) => (
                    <option key={column}>{column}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Title
                </label>

                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Silver button"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Description
                </label>

                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the evidence, observation or deduction..."
                  className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm leading-6 text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-amber-600"
                />
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                >
                  Cancel
                </button>

                <button
                  onClick={addNode}
                  disabled={!newTitle.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={16} />
                  Add Intelligence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}