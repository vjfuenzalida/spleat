"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { Participant } from "@/services/participants";

interface Props {
  participants: Participant[];
  include: Set<number>;
  quantities: Record<number, string>;
  onToggle: (id: number) => void;
  onChangeQty: (id: number, v: string) => void;
}

export function QuantitySplitTab({ participants, include, quantities, onToggle, onChangeQty }: Props) {
  return (
    <ScrollArea className="flex-1">
      <div className="divide-y divide-border">
        {participants.map((p) => {
          const active = include.has(p.id);
          return (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 bg-white">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggle(p.id)}
                  className="form-checkbox h-5 w-5"
                />
                <span className="text-sm">{p.name}</span>
              </label>
              <Input
                name={`quantity_${p.id}`}
                type="number"
                step="0.01"
                min="0"
                disabled={!active}
                value={quantities[p.id] ?? ""}
                onChange={(e) => onChangeQty(p.id, e.target.value)}
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
