import { ParticipantForm } from "@/components/ParticipantForm";
import { ParticipantList } from "@/components/ParticipantList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ManageParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const billId = parseInt(id, 10);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Link
        href={`/bills/${billId}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver a la boleta
      </Link>

      <h1 className="text-2xl font-bold text-center">Participantes</h1>

      <ParticipantForm billId={billId} />
      <ParticipantList billId={billId} />
    </div>
  );
}