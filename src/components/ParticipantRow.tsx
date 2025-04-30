"use client";

import type { Participant } from "@/services/participants";
import { DeleteParticipantButton } from "@/components/DeleteParticipantButton";
import { getColorByName } from "@/lib/colorUtils";

interface ParticipantRowProps {
  participant: Participant;
}

export function ParticipantRow({ participant }: ParticipantRowProps) {
  const bg = getColorByName(participant.name);

  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-foreground"
          style={{ backgroundColor: bg }}
        >
          {participant.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-foreground">{participant.name}</span>
      </div>
      <DeleteParticipantButton participantId={participant.id} />
    </div>
  );
}
