"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBillAction } from "@/actions/bills";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionResult } from "@/types/actions";

const initialState: ActionResult = { success: false, error: "" };

export function BillCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createBillAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Boleta creada con éxito");
      router.push("/bills");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la boleta</Label>
        <Input id="name" name="name" placeholder="Ej: Cena familiar" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emoji">Emoji (opcional)</Label>
        <Input id="emoji" name="emoji" placeholder="Ej: 🍽️" maxLength={2} />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : "Crear boleta"}
      </Button>
    </form>
  );
}