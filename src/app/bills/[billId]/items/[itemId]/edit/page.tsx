// app/bills/[billId]/items/[itemId]/edit/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { dbGetItemById } from "@/services/items";
import { ItemEditForm } from "@/components/forms/ItemEditForm";
import { BackButton } from "@/components/BackButton";

interface EditItemPageProps {
  params: Promise<{ billId: string; itemId: string }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { billId: billIdParam, itemId: itemIdParam } = await params;
  const billId = parseInt(billIdParam, 10);
  const itemId = parseInt(itemIdParam, 10);
  if (isNaN(billId) || isNaN(itemId)) notFound();

  const item = await dbGetItemById(itemId);
  if (!item || item.billId !== billId) notFound();

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <BackButton href={`/bills/${billId}`} title="Volver a la boleta"/>

      <h1 className="text-2xl font-bold text-center">Editar ítem</h1>

      <ItemEditForm billId={billId} item={item} />
    </div>
  );
}
