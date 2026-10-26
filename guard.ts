// The fix: inspect every outgoing payload. Pattern matching, not a model. A floor, not a ceiling.
import type { Send } from "./agent.ts";

const luhn = (d: string) => {
  let s = 0;
  for (let i = 0; i < d.length; i++) {
    let n = +d[d.length - 1 - i];
    if (i % 2) { n *= 2; if (n > 9) n -= 9; }
    s += n;
  }
  return s % 10 === 0;
};

export function guard(s: Send): string | null {
  for (const m of s.body.match(/\b(?:\d[ -]?){13,19}\b/g) ?? [])
    if (luhn(m.replace(/\D/g, ""))) return "card number in outbound payload";
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(s.body)) return "SSN-like ID in outbound payload";
  return null;
}
