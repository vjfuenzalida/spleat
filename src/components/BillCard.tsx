"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteBillAction } from "@/actions/bills";

interface BillCardProps {
  bill: {
    id: number;
    name: string;
    createdAt: Date;
    emoji?: string;
  };
}

export function BillCard({ bill }: BillCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBillAction(bill.id);
      toast.success("Boleta eliminada");
      router.refresh();
    });
  };

  return (
    <Card className="hover:shadow-sm transition">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">
            {bill.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Creada el{" "}
            {new Date(bill.createdAt).toLocaleDateString("es-CL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/bills/${bill.id}`}>Ver</Link>
          </Button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
