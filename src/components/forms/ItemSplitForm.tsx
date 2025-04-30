"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateItemAction } from "@/actions/items";
import { ActionResult } from "@/types/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SplitMode } from "@/models/items";
import type { Participant } from "@/services/participants";
import type { Assignment } from "@/services/assignments";
import type { Item } from "@/services/items";

interface ItemSplitFormProps {
  billId: number;
  item: Item;
  participants: Participant[];
  initialAssignments: Assignment[];
}

export function ItemSplitForm({
  billId,
  item,
  participants,
  initialAssignments,
}: ItemSplitFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateItemAction,
    {} as ActionResult
  );
  const router = useRouter();

  const [mode, setMode] = useState<SplitMode>(
    item.splitMode ?? SplitMode.EQUAL
  );
  const [include, setInclude] = useState<Set<number>>(() =>
    new Set(initialAssignments.map((a) => a.participantId))
  );
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const m: Record<number, number> = {};
    initialAssignments.forEach((a) => {
      if (a.quantity != null) m[a.participantId] = Number(a.quantity);
    });
    return m;
  });
  const [shares, setShares] = useState<Record<number, number>>(() => {
    const m: Record<number, number> = {};
    initialAssignments.forEach((a) => {
      if (a.shares != null) m[a.participantId] = Number(a.shares);
    });
    return m;
  });

  const toggle = (id: number) =>
    setInclude((s) => {
      const next = new Set(s);
      s.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const onQuantityChange = (id: number, v: string) => {
    const n = parseFloat(v) || 0;
    setQuantities((q) => ({ ...q, [id]: n }));
  };

  const onShareChange = (id: number, v: string) => {
    const n = parseInt(v) || 0;
    setShares((s) => ({ ...s, [id]: n }));
  };

  const totalQty = Array.from(include).reduce(
    (sum, id) => sum + (quantities[id] || 0),
    0
  );
  const qtyError = mode === SplitMode.QUANTITY && totalQty !== item.quantity;

  useEffect(() => {
    if (state.success) {
      toast.success("Distribución guardada");
      router.push(`/bills/${billId}`);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, billId]);

  return (
    <form action={formAction} className="flex-1 flex flex-col">
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="billId" value={billId} />
      <input type="hidden" name="splitMode" value={mode} />

      <Tabs value={mode} onValueChange={(v) => setMode(v as SplitMode)}>
        <TabsList className="bg-muted py-1 px-2 rounded-full space-x-1 mb-4">
          <TabsTrigger
            value={SplitMode.EQUAL}
            className="px-3 data-[state=active]:bg-white data-[state=active]:shadow"
          >
            Partes iguales
          </TabsTrigger>
          <TabsTrigger
            value={SplitMode.QUANTITY}
            className="px-3 data-[state=active]:bg-white data-[state=active]:shadow"
          >
            Por cantidad
          </TabsTrigger>
          <TabsTrigger
            value={SplitMode.SHARES}
            className="px-3 data-[state=active]:bg-white data-[state=active]:shadow"
          >
            Por porciones
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {participants.map((p) => {
              const active = include.has(p.id);
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-4 py-3 bg-white"
                >
                  <span className="flex-1">{p.name}</span>

                  {mode === SplitMode.EQUAL && (
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggle(p.id)}
                      className="form-checkbox h-5 w-5 text-primary ml-4"
                    />
                  )}

                  {mode === SplitMode.QUANTITY && (
                    <Input
                      name={`quantity_${p.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      disabled={!active}
                      value={quantities[p.id] ?? ""}
                      onChange={(e) =>
                        onQuantityChange(p.id, e.target.value)
                      }
                      className="w-20 text-right ml-4"
                    />
                  )}

                  {mode === SplitMode.SHARES && (
                    <Input
                      name={`shares_${p.id}`}
                      type="number"
                      step="1"
                      min="0"
                      disabled={!active}
                      value={shares[p.id] ?? ""}
                      onChange={(e) =>
                        onShareChange(p.id, e.target.value)
                      }
                      className="w-20 text-right ml-4"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Tabs>

      <div className="pt-2 border-t border-border mt-4">
        {mode === SplitMode.QUANTITY && (
          <p
            className={`text-sm ${qtyError ? "text-destructive" : "text-muted-foreground"
              }`}
          >
            {totalQty.toFixed(2)} de {item.quantity.toFixed(2)}
          </p>
        )}
        {mode === SplitMode.EQUAL && (
          <p className="text-sm text-muted-foreground">
            {include.size > 0
              ? `${Math.floor(item.quantity / include.size)} c/u (${include.size
              } pers.)`
              : "Selecciona personas"}
          </p>
        )}
        {mode === SplitMode.SHARES && (
          <p className="text-sm text-muted-foreground">
            {include.size > 0
              ? `${Array.from(include).reduce((sum, id) => sum + shares[id]
                , 0)} % en total`
              : "Selecciona personas"}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending || qtyError}
        className="mt-4 w-full"
      >
        {isPending ? "Guardando…" : "Guardar cambios"}
      </Button>
    </form>
  );
}
