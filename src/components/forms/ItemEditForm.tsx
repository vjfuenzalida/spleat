"use client";

import { useState, useEffect, useMemo } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SplitMode } from "@/models/items";
import { updateItemAction } from "@/actions/items";
import { ActionResult } from "@/types/actions";

import type { Participant } from "@/services/participants";
import type { Assignment } from "@/services/assignments";
import type { Item } from "@/services/items";
import { EqualSplitTab } from "./split/EqualSplitTab";
import { normalizeNumericInput } from "@/lib/formatters";

interface Props {
  billId: number;
  item: Item;
  participants: Participant[];
  assignments: Assignment[];
}

const initialState: ActionResult = { success: false, error: "" };

export function ItemEditForm({ billId, item, participants, assignments }: Props) {
  const router = useRouter();

  const [actionState, formAction, isPending] = useActionState(
    updateItemAction,
    initialState
  );

  const [name, setName] = useState(item.name);
  const [unitPrice, setUnitPrice] = useState(item.unitPrice.toString());
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const [included, setIncluded] = useState<Set<number>>(() =>
    new Set(assignments.map((a) => a.participantId))
  );

  const toggleInclude = (id: number) =>
    setIncluded((s) => {
      const next = new Set(s);
      if (s.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const qtyTotal = parseFloat(quantity || "0");
  const perPerson = useMemo(() => {
    if (included.size === 0) return 0;
    return Math.floor(qtyTotal / included.size);
  }, [qtyTotal, included]);

  useEffect(() => {
    if (actionState.success) {
      toast.success("Ítem actualizado");
      router.push(`/bills/${billId}`);
    } else if (actionState.error) {
      toast.error(actionState.error);
    }
  }, [actionState, router, billId]);

  return (
    <form action={formAction} className="flex flex-col h-full space-y-6">
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="billId" value={billId} />
      <input type="hidden" name="splitMode" value={SplitMode.EQUAL} />

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="unitPrice">Precio unitario</Label>
          <Input
            id="unitPrice"
            name="unitPrice"
            type="number"
            step="0.01"
            min="0"
            value={normalizeNumericInput(unitPrice)}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="quantity">Cantidad total</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            step="1"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="mb-2 text-sm font-medium">Partes iguales</div>
        <EqualSplitTab
          participants={participants}
          included={included}
          onToggle={toggleInclude}
        />
      </div>

      <div className="pt-2 border-t border-border">
        {included.size > 0 ? (
          <p className="text-sm text-muted-foreground">
            {perPerson} unidad{perPerson !== 1 ? "es" : ""} c/u (
            {included.size} {included.size > 1 ? "personas" : "persona"})
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Selecciona al menos una persona
          </p>
        )}
      </div>

      {Array.from(included).map((pid) => (
        <input
          key={pid}
          type="hidden"
          name={`quantity_${pid}`}
          value={perPerson.toString()}
        />
      ))}

      <Button
        type="submit"
        disabled={isPending || included.size === 0}
        className="w-full"
      >
        {isPending ? "Guardando…" : "Guardar ítem"}
      </Button>
    </form>
  );
}
