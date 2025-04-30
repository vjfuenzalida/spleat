import React from "react";
import type { Summary } from "@/lib/billing";
import { formatCLP } from "@/lib/formatters";

interface SummaryGridProps {
  summary: Summary;
}

export function SummaryGrid({ summary }: SummaryGridProps) {
  const entries = [
    {
      label: "Subtotal",
      value: summary.subtotal,
      bg: "bg-blue-100",
      fg: "text-blue-800",
    },
    {
      label: "Descuentos",
      value: -summary.discount,
      bg: "bg-green-100",
      fg: "text-green-800",
    },
    {
      label: "Propina (10%)",
      value: summary.tip,
      bg: "bg-red-100",
      fg: "text-red-800",
    },
    {
      label: "Total a pagar",
      value: summary.total,
      bg: "bg-blue-200",
      fg: "text-blue-900",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-2">
      {entries.map((entry) => (
        <div
          key={entry.label}
          className={`${entry.bg} ${entry.fg} rounded-xl p-3 text-center`}
        >
          <div className="text-sm">{entry.label}</div>
          <div className="text-lg font-bold">
            {formatCLP(entry.value)}
          </div>
        </div>
      ))}
    </div>
  );
}