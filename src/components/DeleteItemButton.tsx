"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteItemAction } from "@/actions/items";
import { Button } from "@/components/ui/button";

interface DeleteItemButtonProps {
  billId: number;
  itemId: number;
}

export function DeleteItemButton({ billId, itemId }: DeleteItemButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      const res = await deleteItemAction(itemId);
      if (res.success) {
        toast.success("Ítem eliminado");
        router.push(`/bills/${billId}`);
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={onDelete}
      disabled={isPending}
      className="w-full"
    >
      {isPending ? "Eliminando..." : "Eliminar ítem"}
    </Button>
  );
}