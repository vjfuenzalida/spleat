"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createItemAction } from "@/actions/items";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionResult } from "@/types/actions";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export function ItemForm({ billId }: { billId: number }) {
  const [state, formAction, isPending] = useActionState(
    createItemAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Ítem agregado con éxito");
      router.push(`/bills/${billId}`);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, billId]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="billId" value={billId} />

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" placeholder="Ej: Pizza" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unitPrice">Precio unitario</Label>
        <Input
          id="unitPrice"
          name="unitPrice"
          type="number"
          step="1"
          min="0"
          placeholder="Ej: 7990"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Cantidad</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          step="1"
          min="1"
          defaultValue={1}
          required
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : "Agregar ítem"}
      </Button>
    </form>
  );
}
