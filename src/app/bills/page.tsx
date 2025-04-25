import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BillCard } from "@/components/BillCard";
import { dbGetAllBills } from "@/services/bills";

export default async function BillsPage() {
  const bills = await dbGetAllBills();

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mis boletas</h1>
        <Button asChild>
          <Link href="/bills/new">Nueva boleta</Link>
        </Button>
      </div>

      {bills.length === 0 ? (
        <p className="text-muted-foreground">Aún no has creado ninguna boleta.</p>
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
