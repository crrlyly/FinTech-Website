import type { Budget } from "../models/Budget";
import type { Transaction } from "../models/Transaction";

export function getExpenseByCategory(
  transactions: Transaction[],
  category: string,
): number {
  return transactions
    .filter((p) => p.category.toLowerCase() === category.toLowerCase() && p.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getExpense(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getTotalBudgeted(budgets: Budget[]) {
  return budgets.reduce((a, b) => a + Number(b.maxAmount), 0);
}

export function unallocatedMoney(
  transactions: Transaction[],
  budgets: Budget[],
) {
  return getIncome(transactions) - getTotalBudgeted(budgets);
}
