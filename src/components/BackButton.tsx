import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackButton({ href, title }: { href: string; title: string }) {
  return (
    <div className="mb-2">
    <Link
      href={href}
      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      {title}
    </Link>
  </div>
  );
}
