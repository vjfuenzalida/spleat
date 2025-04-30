import React from "react";
import { ItemCreateForm } from "@/components/forms/ItemCreateForm";
import { BackButton } from "@/components/BackButton";

interface NewItemPageProps {
  params: Promise<{ billId: string }>;
}

export default async function NewItemPage({ params }: NewItemPageProps) {
  const { billId: id } = await params;
  const billId = parseInt(id, 10);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="mb-2">
        <BackButton href={`/bills/${billId}`} title="Volver a la boleta"/>
      </div>

      <h1 className="text-2xl font-bold text-center">Agregar ítem</h1>

      <ItemCreateForm billId={billId} />
    </div>
  );
}
