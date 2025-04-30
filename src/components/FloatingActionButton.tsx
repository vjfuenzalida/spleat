"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FloatingActionButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg text-2xl p-0"
      >
        ＋
      </Button>
    </Link>
  );
}