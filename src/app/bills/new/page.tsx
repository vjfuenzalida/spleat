"use client";

import { useActionState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { ActionResult } from '@/types/actions';
import { createBillAction } from '@/actions/bills';

const initialState: ActionResult = {
  success: false,
  error: "",
};

export default function NewBillPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createBillAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Boleta creada con éxito 🎉");
      router.push("/bills");
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="mb-2">
        <Link
          href="/bills"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a boletas
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-center">Crear nueva boleta</h1>


      <Card>
        <CardContent className="p-6 space-y-4">
          <form action={formAction}>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                name="name"
                id="name"
                placeholder="e.g. After Office"
                required
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creando..." : "Crear boleta"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
