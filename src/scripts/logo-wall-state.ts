export function wallDimensions(width: number): { count: number; columns: number } {
  return width > 1024 ? { count: 12, columns: 6 } : width >= 640 ? { count: 9, columns: 3 } : { count: 6, columns: 2 };
}
export function adjacent(a: number, b: number, columns: number): boolean {
  return Math.abs(Math.floor(a / columns) - Math.floor(b / columns)) +
    Math.abs(a % columns - b % columns) === 1;
}
function candidates(count: number, columns: number, recent: number[]): number[] {
  const last = recent.at(-1);
  return Array.from({ length: count }, (_, i) => i)
    .filter((i) => !recent.includes(i) && (last === undefined || !adjacent(i, last, columns)));
}
const viableCache = new Map<string, Set<string>>();
function viableStates(count: number, columns: number): Set<string> {
  const key = `${count}/${columns}`;
  const cached = viableCache.get(key);
  if (cached) return cached;
  const states = new Map<string, number[]>();
  for (let a = 0; a < count; a++) {
    for (const b of candidates(count, columns, [a])) {
      for (const c of candidates(count, columns, [a, b])) states.set([a,b,c].join(","), [a,b,c]);
    }
  }
  // With six mobile cells, a locally valid choice can dead-end one turn later.
  // Remove every state that cannot lead to another viable state (finite graph).
  let changed = true;
  while (changed) {
    changed = false;
    for (const [id, history] of states) {
      if (!candidates(count, columns, history).some((next) => states.has([...history.slice(1), next].join(",")))) {
        states.delete(id); changed = true;
      }
    }
  }
  const viable = new Set(states.keys());
  viableCache.set(key, viable);
  return viable;
}
export function chooseCell(count: number, columns: number, recent: number[], random = Math.random): number | undefined {
  const viable = viableStates(count, columns);
  const canContinue = (history: number[]): boolean => history.length === 3
    ? viable.has(history.join(","))
    : candidates(count, columns, history).some((next) => canContinue([...history, next]));
  const eligible = candidates(count, columns, recent).filter((next) => canContinue([...recent, next].slice(-3)));
  return eligible[Math.floor(random() * eligible.length)];
}
export const replacementDelay = (random = Math.random): number => 1100 + random() * 500;
