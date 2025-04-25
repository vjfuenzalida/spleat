"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createParticipantAction } from "@/actions/participants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionResult } from "@/types/actions";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export function ParticipantForm({ billId }: { billId: number }) {
  const [state, formAction, isPending] = useActionState(
    createParticipantAction,
    initialState
  );
  const router = useRouter();
  const [_, startTransition] = useTransition();

  useEffect(() => {
    if (state.success) {
      toast.success("Participante agregado");
      startTransition(() => {
        router.refresh();
      });
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex gap-2">
      <input type="hidden" name="billId" value={billId} />
      <Input name="name" placeholder="Nombre" className="flex-1" required />
      <Button type="submit" disabled={isPending}>
        Agregar
      </Button>
    </form>
  );
}
