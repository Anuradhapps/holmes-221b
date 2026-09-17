"use client";

import {
  ArrowLeft,
  Brain,
  ChevronDown,
  Circle,
  Link2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NodeType = "Evidence" | "Observation" | "Suspect" | "Deduction";

type Node = {
  id: number;
  type: NodeType;
  title: string;
  description: string;
};

const initialNodes: Node[] = [
  {
    id: 1,
    type: "Evidence",
    title: "Broken Window",
    description: "Glass fragments found inside the study.",
  },
  {
    id: 2,
    type: "Evidence",
    title: "Muddy Footprint",
    description: "Partial footprint discovered near the desk.",
  },
  {
    id: 3,
    type: "Evidence",
    title: "Torn Glove",
    description: "Dark fabric recovered from the window.",
  },
  {
    id: 4,
    type: "Suspect",
    title: "Mrs. Whitmore",
    description: "Housekeeper with access to the study.",
  },
  {
    id: 5,
    type: "Suspect",
    title: "James Bell",
    description: "Personal assistant to Lord Harrington.",
  },
  {
    id: 6,
    type: "Observation",
    title: "Window opened from inside",
    description: "No external damage was found on the window frame.",
  },
  {
    id: 7,
    type: "Deduction",
    title: "Inside access likely",
    description: "The evidence suggests the culprit may have had legitimate access.",
  },
];

const columns: NodeType[] = [
  "Evidence",
  "Observation",
  "Suspect",
  "Deduction",
];

export default function DeductionBoardPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  function deleteNode(id: number) {
    setNodes((current) => current.filter((node) => node.id !== id));

    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  }

  function addNode(node: Node) {
    setNodes((current) => [...current, node]);
    setShowAdd(false);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <Link
            href="/cases/27"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            Back to Case #27
          </Link>

          <p className="text-sm uppercase tracking-widest text-amber-500">
            Investigation Workspace
          </p>

          <h1 className="mt-2 font-serif text-4xl text-zinc-100">
            Deduction Board
          </h1>

          <p className="mt-2 text-zinc-500">
            Connect evidence, observations, suspects, and deductions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-500"
          >
            <Plus size={17} />
            Add Node
          </button>
        </div>

      </div>

      {/* Case bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-950/40 text-amber-500">
            <Brain size={20} />
          </div>

          <div>
            <p className="text-xs text-zinc-600">
              CURRENT INVESTIGATION
            </p>

            <p className="mt-1 font-serif text-lg text-zinc-200">
              #27 — The Missing Sapphire
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs text-zinc-500">
          <span>{nodes.length} nodes</span>

          <span className="flex items-center gap-2">
            <Circle size={8} className="fill-amber-500 text-amber-500" />
            Investigation active
          </span>
        </div>

      </div>

      {/* Board */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#11100e]">
        <div className="min-w-[1100px] p-6">

          {/* Column headers */}
          <div className="grid grid-cols-4 gap-5">

            {columns.map((column) => (
              <div key={column}>
                <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">

                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-600">
                      {column}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {
                        nodes.filter(
                          (node) => node.type === column
                        ).length
                      }{" "}
                      items
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAdd(true)}
                    className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-900 hover:text-amber-500"
                  >
                    <Plus size={15} />
                  </button>

                </div>

                <div className="space-y-3">
                  {nodes
                    .filter((node) => node.type === column)
                    .map((node) => (
                      <NodeCard
                        key={node.id}
                        node={node}
                        onSelect={() => setSelectedNode(node)}
                        onDelete={() => deleteNode(node.id)}
                      />
                    ))}

                  {nodes.filter(
                    (node) => node.type === column
                  ).length === 0 && (
                    <div className="rounded-lg border border-dashed border-zinc-800 p-6 text-center">
                      <p className="text-xs text-zinc-700">
                        No items
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* Insight */}
      <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-6">

        <div className="flex gap-4">

          <Brain
            size={20}
            className="mt-1 shrink-0 text-amber-500"
          />

          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600">
              Holmes&apos;s Current Deduction
            </p>

            <p className="mt-2 font-serif text-xl text-zinc-200">
              The evidence indicates that the culprit may have had
              legitimate access to the property.
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Connect additional evidence to strengthen or challenge
              this deduction.
            </p>
          </div>

        </div>

      </div>

      {/* Selected Node */}
      {selectedNode && (
        <NodeDetail
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Add modal */}
      {showAdd && (
        <AddNodeModal
          nextId={Math.max(...nodes.map((node) => node.id)) + 1}
          onClose={() => setShowAdd(false)}
          onAdd={addNode}
        />
      )}

    </div>
  );
}

function NodeCard({
  node,
  onSelect,
  onDelete,
}: {
  node: Node;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
    >

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />

          <span className="text-[10px] uppercase tracking-widest text-zinc-600">
            {node.type}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 text-zinc-600 transition hover:text-red-400 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>

      </div>

      <h3 className="mt-3 font-serif text-base text-zinc-200">
        {node.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {node.description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-700">
        <Link2 size={12} />
        Click to inspect
      </div>

    </div>
  );
}

function NodeDetail({
  node,
  onClose,
}: {
  node: Node;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>
            <p className="text-xs uppercase tracking-widest text-amber-500">
              {node.type}
            </p>

            <h2 className="mt-2 font-serif text-2xl text-zinc-100">
              {node.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6">
          <p className="text-sm leading-7 text-zinc-400">
            {node.description}
          </p>
        </div>

      </div>

    </div>
  );
}

function AddNodeModal({
  nextId,
  onClose,
  onAdd,
}: {
  nextId: number;
  onClose: () => void;
  onAdd: (node: Node) => void;
}) {
  const [type, setType] = useState<NodeType>("Evidence");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({
      id: nextId,
      type,
      title: title.trim(),
      description:
        description.trim() || "No additional information provided.",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>
            <h2 className="font-serif text-2xl text-zinc-100">
              Add Investigation Node
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add information to your deduction board.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Type
            </label>

            <div className="relative">
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as NodeType)
                }
                className="w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-600"
              >
                <option>Evidence</option>
                <option>Observation</option>
                <option>Suspect</option>
                <option>Deduction</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fingerprint on window"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the evidence or deduction..."
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-600"
            />
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
              Add Node
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}