import { dbGetParticipantsByBillId } from "@/services/participants";

export async function ParticipantList({ billId }: { billId: number }) {
  const participants = await dbGetParticipantsByBillId(billId);

  return (
    <div className="space-y-2 mt-4">
      {participants.map((p, i) => (
        <div
          key={p.id}
          className="flex items-center justify-between rounded-lg border px-4 py-2 bg-background shadow-sm"
        >
          <span className="text-sm text-muted-foreground">{i + 1}.</span>
          <span className="flex-1 text-sm pl-3 text-foreground font-medium">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}