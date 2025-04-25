import { Trash2 } from "lucide-react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface CompactItemCardProps {
  item: Item;
  onDelete?: () => void;
}

export function CompactItemCard({ item, onDelete }: CompactItemCardProps) {
  const total = item.unitPrice * item.quantity;

  return (
    <div className="flex justify-between items-center bg-muted px-4 py-3 rounded-xl">
      <div className="flex flex-col">
        <span className="font-medium text-base">{item.name}</span>
        <span className="text-sm text-muted-foreground">
          {item.quantity} {item.quantity > 1 ? "unidades" : "unidad"}
        </span>
      </div>
      <div className="text-right space-y-0.5">
        <div className="text-base font-semibold">
          ${total.toLocaleString("es-CL")}
        </div>
        <div className="text-sm text-muted-foreground">
          ${item.unitPrice.toLocaleString("es-CL")} c/u
        </div>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-3 text-destructive hover:text-destructive/80"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
