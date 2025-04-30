"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteParticipantAction } from "@/actions/participants";
import { Button } from "@/components/ui/button";

export function DeleteParticipantButton({ participantId }: { participantId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      const res = await deleteParticipantAction(participantId);
      if (res.success) {
        toast.success("Participante eliminado");
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onDelete}
      disabled={isPending}
      className="text-destructive hover:text-destructive/80"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}