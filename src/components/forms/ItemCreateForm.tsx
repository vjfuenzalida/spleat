"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createItemAction } from "@/actions/items";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionResult } from "@/types/actions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SplitMode } from "@/models/items";

const initialState: ActionResult = {
  success: false,
  error: "",
};

interface ItemCreateFormProps {
  billId: number;
}

export function ItemCreateForm({ billId }: ItemCreateFormProps) {
  const [state, formAction, isPending] = useActionState(
    createItemAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Ítem creado con éxito");
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
          step="0.01"
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

      <div className="space-y-2">
        <Label htmlFor="splitMode">Modo de división</Label>
        <Select
          name="splitMode"
          required
          defaultValue={SplitMode.EQUAL}
        >
          <SelectTrigger id="splitMode">
            <SelectValue placeholder="Selecciona un modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SplitMode.EQUAL}>
              Partes iguales
            </SelectItem>
            <SelectItem value={SplitMode.QUANTITY}>
              Por cantidad
            </SelectItem>
            <SelectItem value={SplitMode.SHARES}>
              Partes personalizadas
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : "Agregar ítem"}
      </Button>
    </form>
  );
}
