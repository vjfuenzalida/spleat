import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { dbGetBillById } from "@/services/bills";
import { dbGetParticipantsByBillId } from "@/services/participants";
import { AddParticipantModal } from "@/components/AddParticipantModal";
import { DeleteBillButton } from "@/components/DeleteBillButton";
import { ParticipantRow } from "@/components/ParticipantRow";

interface SettingsPageProps {
  params: Promise<{ billId: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { billId: id } = await params;
  const billId = parseInt(id, 10);
  if (isNaN(billId)) notFound();

  const bill = await dbGetBillById(billId);
  if (!bill) notFound();

  const participants = await dbGetParticipantsByBillId(billId);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Link
        href={`/bills/${billId}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver a la boleta
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Ajustes de boleta</h1>
        <p className="text-lg text-muted-foreground">{bill.name}</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Participantes</h2>
        <AddParticipantModal billId={billId} />
      </div>

      <div className="space-y-1">
        {participants.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay participantes aún.
          </p>
        ) : (
          participants.map((p) => (
            <ParticipantRow key={p.id} participant={p} />
          ))
        )}
      </div>

      <DeleteBillButton billId={billId} />
    </div>
  );
}
