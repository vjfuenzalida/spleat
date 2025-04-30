import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dbGetAllBills, Bill } from "@/services/bills";
import { BillCard } from "@/components/BillCard";

export default async function BillsPage() {
  const bills: Bill[] = await dbGetAllBills();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Boletas</h1>
        <Button asChild>
          <Link href="/bills/new">Crear nueva boleta</Link>
        </Button>
      </div>

      {bills.length === 0 ? (
        <p className="text-muted-foreground">No hay boletas.</p>
      ) : (
        <div className="grid gap-4">
          {bills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </div>
      )}
    </div>
  );
}
