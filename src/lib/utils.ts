type ClassValue = string | number | null | false | undefined | ClassValue[];

/**
 * Class-name joiner with last-wins conflict resolution for the utilities this
 * project actually uses. Inlined rather than pulling clsx + tailwind-merge —
 * the surface here is small and the dependency isn't worth it.
 */
export function cn(...inputs: ClassValue[]): string {
  const flat: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) { v.forEach(walk); return; }
    String(v).split(/\s+/).filter(Boolean).forEach((t) => flat.push(t));
  };
  inputs.forEach(walk);

  // Later classes override earlier ones sharing a prefix group.
  const groups = new Map<string, string>();
  const order: string[] = [];
  for (const cls of flat) {
    const key = groupOf(cls);
    if (!groups.has(key)) order.push(key);
    groups.set(key, cls);
  }
  return order.map((k) => groups.get(k)!).join(" ");
}

const PREFIXES = [
  "px", "py", "pt", "pr", "pb", "pl", "p",
  "mx", "my", "mt", "mr", "mb", "ml", "m",
  "gap-x", "gap-y", "gap",
  "text", "font", "leading", "tracking",
  "bg", "border", "rounded", "shadow", "ring", "outline",
  "w", "h", "min-w", "min-h", "max-w", "max-h",
  "flex", "grid-cols", "items", "justify", "self",
  "opacity", "z", "inset", "top", "right", "bottom", "left",
];

function groupOf(cls: string): string {
  const [variants, base] = splitVariants(cls);
  for (const p of PREFIXES) {
    if (base === p || base.startsWith(p + "-")) return variants + p;
  }
  return cls;
}

function splitVariants(cls: string): [string, string] {
  const i = cls.lastIndexOf(":");
  return i === -1 ? ["", cls] : [cls.slice(0, i + 1), cls.slice(i + 1)];
}
