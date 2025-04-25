"use client";

import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createParticipantAction } from "@/actions/participants";
import { ActionResult } from "@/types/actions";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export default function NewParticipantPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  const { id } = React.use(params);
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
        <Link
          href={`/bills/${billId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a la boleta
        </Link>
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
