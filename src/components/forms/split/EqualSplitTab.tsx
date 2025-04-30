"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Participant } from "@/services/participants";

interface Props {
  participants: Participant[];
  included: Set<number>;
  onToggle: (id: number) => void;
}

export function EqualSplitTab({ participants, included, onToggle }: Props) {
  return (
    <ScrollArea className="flex-1">
      <div className="divide-y divide-border">
        {participants.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between px-4 py-3 bg-white"
          >
            <span className="text-sm">{p.name}</span>
            <input
              type="checkbox"
              checked={included.has(p.id)}
              onChange={() => onToggle(p.id)}
              className="form-checkbox h-5 w-5"
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
