import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBillAction } from "@/actions/bills";
import { dbGetItemsByBillId } from "@/services/items";
import { CompactItemCard } from "@/components/CompactItemCard";


export default async function BillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const billId = parseInt(id, 10);
  if (isNaN(billId)) notFound();

  const bill = await getBillAction(billId);
  if (!bill) notFound();

  const items = await dbGetItemsByBillId(billId);

  const totalRaw = items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0
  );
  const tip = Math.round(totalRaw * 0.1);
  const discount = 0;
  const totalToPay = totalRaw + tip - discount;

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Flecha para volver */}
      <div className="mb-2">
        <Link
          href="/bills"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a boletas
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{bill.name}</h1>
        <Button asChild>
          <Link href={`/bills/${bill.id}/items/new`}>＋</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-blue-100 text-blue-800 p-3 text-center">
          <div className="text-sm">Subtotal</div>
          <div className="text-lg font-bold">${totalRaw.toLocaleString("es-CL")}</div>
        </div>
        <div className="rounded-xl bg-green-100 text-green-800 p-3 text-center">
          <div className="text-sm">Descuentos</div>
          <div className="text-lg font-bold">-${discount.toLocaleString("es-CL")}</div>
        </div>
        <div className="rounded-xl bg-red-100 text-red-800 p-3 text-center">
          <div className="text-sm">Propina (10%)</div>
          <div className="text-lg font-bold">${tip.toLocaleString("es-CL")}</div>
        </div>
        <div className="rounded-xl bg-blue-200 text-blue-900 p-3 text-center">
          <div className="text-sm">Total a pagar</div>
          <div className="text-lg font-bold">${totalToPay.toLocaleString("es-CL")}</div>
        </div>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No hay ítems aún.</p>
        ) : (
          items.map((item) => (
            <CompactItemCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
