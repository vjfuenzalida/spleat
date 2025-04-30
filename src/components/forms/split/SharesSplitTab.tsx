"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { Participant } from "@/services/participants";

interface Props {
  participants: Participant[];
  include: Set<number>;
  shares: Record<number, string>;
  onToggle: (id: number) => void;
  onChangeShare: (id: number, v: string) => void;
}

export function SharesSplitTab({ participants, include, shares, onToggle, onChangeShare }: Props) {
  return (
    <ScrollArea className="flex-1">
      <div className="divide-y divide-border">
        {participants.map((p) => {
          const active = include.has(p.id);
          return (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 bg-white">
              <span className="text-sm">{p.name}</span>
              <Input
                name={`shares_${p.id}`}
                type="number"
                step="1"
                min="0"
                disabled={!active}
                value={shares[p.id] ?? ""}
                onChange={(e) => onChangeShare(p.id, e.target.value)}
                className="w-20 text-right"
                placeholder="0"
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
