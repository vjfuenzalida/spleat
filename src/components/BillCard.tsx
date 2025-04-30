import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Bill } from "@/services/bills";

export function BillCard({ bill }: { bill: Bill }) {
  return (
    <Link href={`/bills/${bill.id}`} className="block">
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardContent className="p-4 space-y-1">
          <h2 className="text-lg font-semibold">{bill.name}</h2>
          <p className="text-sm text-muted-foreground">
            Creada: {new Date(bill.createdAt).toLocaleDateString("es-CL")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
