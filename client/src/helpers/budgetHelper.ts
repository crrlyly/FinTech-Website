import type { Transaction } from "../models/Transaction";
export function getPriceByCategory(
  transactions: Transaction[],
  category: string,
): number {
  return transactions
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .reduce((a, t) => a + Number(t.amount), 0);
}
