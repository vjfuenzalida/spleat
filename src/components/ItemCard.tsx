import type { Item } from "@/services/items";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatCLP } from "@/lib/formatters";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const total = item.unitPrice * item.quantity;

  return (
    <Link
      href={`/bills/${item.billId}/items/${item.id}/edit`}
      className="block hover:shadow-md transition cursor-pointer"
    >
      <Card>
        <CardContent className="flex justify-between items-center px-4 py-3">
          <div className="flex flex-col">
            <span className="font-medium text-base text-foreground">
              {item.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {item.quantity} {item.quantity > 1 ? "unidades" : "unidad"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-base text-foreground">
              {formatCLP(total)}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatCLP(item.unitPrice)} c/u
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
