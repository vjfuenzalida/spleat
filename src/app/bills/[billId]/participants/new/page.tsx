"use client";

import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createParticipantAction } from "@/actions/participants";
import { ActionResult } from "@/types/actions";
import { BackButton } from "@/components/BackButton";

const initialState: ActionResult = {
  success: false,
  error: "",
};

interface NewParticipantPageProps {
  params: Promise<{ billId: string }>;
}

export default function NewParticipantPage({ params }: NewParticipantPageProps) {
  const router = useRouter();

  const { billId: id } = React.use(params);
  const billId = parseInt(id, 10);
  const [state, formAction, isPending] = useActionState(createParticipantAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Participante creado con éxito 🎉");
      router.push(`/bills/${billId}`);
    }
  }, [state.success, router, billId]);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="mb-2">
        <BackButton href={`/bills/${billId}`} title="Volver a la boleta"/>
      </div>

      <h1 className="text-2xl font-bold text-center">Agregar participante</h1>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="billId" value={billId} />

        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Ej: Vicente" required />
        </div>

        {state.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Guardando..." : "Agregar participante"}
        </Button>
      </form>
    </div>
  );
}
