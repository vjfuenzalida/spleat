export function formatCLP(amount: number): string {
  const abs = Math.abs(Math.round(amount));
  const parts = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return amount < 0 ? `-$${parts}` : `$${parts}`;
}

export function normalizeNumericInput(value: number | string): string {
  return value === "" ? "0" : Number(value).toString();
}
