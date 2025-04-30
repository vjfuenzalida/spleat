import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { dbGetItemById } from "@/services/items";
import { ItemEditForm } from "@/components/forms/ItemEditForm";
import { dbGetParticipantsByBillId } from "@/services/participants";
import { dbGetAssignmentsByItemId } from "@/services/assignments";

interface EditInfoPageProps {
  params: Promise<{ billId: string; itemId: string }>;
}

export default async function EditInfoPage({ params }: EditInfoPageProps) {
  const resolvedParams = await params;
  const billId = parseInt(resolvedParams.billId, 10);
  const itemId = parseInt(resolvedParams.itemId, 10);
  if (isNaN(billId) || isNaN(itemId)) notFound();
  const participants = await dbGetParticipantsByBillId(billId);

  const item = await dbGetItemById(itemId);
  if (!item || item.billId !== billId) notFound();
  const assignments = await dbGetAssignmentsByItemId(itemId);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Link
        href={`/bills/${billId}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver a la boleta
      </Link>

      <h1 className="text-2xl font-bold text-center">Editar ítem</h1>

      <ItemEditForm 
        billId={billId} 
        item={item} 
        assignments={assignments} 
        participants={participants} 
      />

      <Link
        href={`/bills/${billId}/items/${itemId}/split`}
        className="block text-center text-sm text-primary hover:underline"
      >
        Seleccionar modo de división
      </Link>
    </div>
  );
}
