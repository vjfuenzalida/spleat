"use client";

import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteItemAction } from "@/actions/items";

interface BillItemCardProps {
  item: {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
  };
}

export function BillItemCard({ item }: BillItemCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteItemAction(item.id);
      toast.success("Ítem eliminado");
      router.refresh();
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-muted-foreground">
              {item.quantity} × ${item.unitPrice.toLocaleString("es-CL")}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-semibold text-right">
              ${(item.unitPrice * item.quantity).toLocaleString("es-CL")}
            </div>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
