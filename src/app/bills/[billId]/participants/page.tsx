import { BackButton } from "@/components/BackButton";
import { ParticipantForm } from "@/components/forms/ParticipantForm";
import { ParticipantList } from "@/components/ParticipantList";
import React from "react";

interface ManageParticipantsPageProps {
  params: Promise<{ billId: string }>;
}

export default function ManageParticipantsPage({ params }: ManageParticipantsPageProps) {
  const { billId: id } = React.use(params);
  const billId = parseInt(id, 10);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <BackButton href={`/bills/${billId}`} title="Volver a la boleta"/>

      <h1 className="text-2xl font-bold text-center">Participantes</h1>

      <ParticipantForm billId={billId} />
      <ParticipantList billId={billId} />
    </div>
  );
}