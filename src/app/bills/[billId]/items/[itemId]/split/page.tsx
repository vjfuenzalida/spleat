import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { dbGetItemById } from "@/services/items";
import { dbGetParticipantsByBillId } from "@/services/participants";
import { ItemSplitForm } from "@/components/forms/ItemSplitForm";
import { dbGetAssignmentsByItemId } from "@/services/assignments";

interface SplitPageProps {
  params: Promise<{ billId: string; itemId: string }>;
}

export default async function SplitPage({ params }: SplitPageProps) {
  const resolvedParams = await params;
  const billId = parseInt(resolvedParams.billId, 10);
  const itemId = parseInt(resolvedParams.itemId, 10);
  if (isNaN(billId) || isNaN(itemId)) notFound();

  const item = await dbGetItemById(itemId);
  if (!item || item.billId !== billId) notFound();

  const participants = await dbGetParticipantsByBillId(billId);
  const assignments = await dbGetAssignmentsByItemId(itemId);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6">
      <div className="mb-4">
        <Link
          href={`/bills/${billId}/items/${itemId}/edit`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a editar datos
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">Dividir: {item.name}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Cantidad total: {item.quantity}
      </p>

      <ItemSplitForm
        billId={billId}
        item={item}
        participants={participants}
        initialAssignments={assignments}
      />
    </div>
  );
}
