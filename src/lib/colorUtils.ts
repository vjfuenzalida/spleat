export const tailwindColors: Record<string, string> = {
  "red-300": "#fca5a5",
  "orange-300": "#fdba74",
  "amber-300": "#fcd34d",
  "lime-300": "#bef264",
  "emerald-300": "#6ee7b7",
  "teal-300": "#5eead4",
  "cyan-300": "#67e8f9",
  "sky-300": "#7dd3fc",
  "blue-300": "#93c5fd",
  "indigo-300": "#a5b4fc",
  "violet-300": "#c4b5fd",
  "purple-300": "#d8b4fe",
  "pink-300": "#f9a8d4",
  "rose-300": "#fda4af",
  "fuchsia-300": "#f0abfc",
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function getColorByName(name: string): string {
  const colorKeys = Object.keys(tailwindColors);
  if (colorKeys.length === 0) return "#000000";
  const hash = hashString(name);
  const index = Math.abs(hash) % colorKeys.length;
  const key = colorKeys[index];
  return tailwindColors[key];
}
