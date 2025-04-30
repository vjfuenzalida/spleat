import Link from "next/link";
import { notFound } from "next/navigation";
import { dbGetBillById } from "@/services/bills";
import { dbGetItemsByBillId } from "@/services/items";
import { computeSummary } from "@/lib/billing";
import { SummaryGrid } from "@/components/BillSummary";
import { ItemCard } from "@/components/ItemCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Settings } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface BillPageProps {
  params: Promise<{ billId: string }>;
}

export default async function BillPage({ params }: BillPageProps) {
  const { billId: id } = await params;
  const billId = parseInt(id, 10);
  if (isNaN(billId)) notFound();

  const bill = await dbGetBillById(billId);
  if (!bill) notFound();

  const items = await dbGetItemsByBillId(billId);
  const summary = computeSummary(items);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="mb-2">
        <BackButton href={'/bills'} title="Volver a boletas"/>
      </div>

      {/* Header with title and settings button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{bill.name}</h1>
        <Link href={`/bills/${bill.id}/participants`}>
          <Settings className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
        </Link>
      </div>

      <SummaryGrid summary={summary} />

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No hay ítems aún.</p>
        ) : (
          items.map(item => <ItemCard key={item.id} item={item} />)
        )}
      </div>

      <FloatingActionButton href={`/bills/${billId}/items/new`} />
    </div>
  );
}
