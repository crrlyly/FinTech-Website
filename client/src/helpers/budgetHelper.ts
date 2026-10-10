import type { Budget } from "../models/Budget";
import type { Transaction } from "../models/Transaction";

interface MonthlyBudget {
  month: number;
  year: number;
  budget: Budget[];
}

export function getExpenseByCategory(
  transactions: Transaction[],
  category: string,
): number {
  return transactions
    .filter(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() &&
        p.type === "expense",
    )
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getIncome(
  transactions: Transaction[],
  month: number,
  year: number,
): number {
  return transactions
    .filter(
      (t) =>
        t.type === "income" &&
        Number(t.date.slice(0, 4)) === year &&
        Number(t.date.slice(5, 7)) === month,
    )
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getExpense(
  transactions: Transaction[],
  month: number,
  year: number,
): number {
  return transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        Number(t.date.slice(0, 4)) === year &&
        Number(t.date.slice(5, 7)) === month,
    )
    .reduce((a, t) => a + Number(t.amount), 0);
}

export function getTotalBudgeted(budgets: Budget[]) {
  return budgets.reduce((a, b) => a + Number(b.maxAmount), 0);
}

export function unallocatedMoney(
  transactions: Transaction[],
  budgets: Budget[],
  month: number,
  year: number,
) {
  return getIncome(transactions, month, year) - getTotalBudgeted(budgets);
}

export function getPast4MonthsBudget(budgets: Budget[]): MonthlyBudget[] {
  const now = new Date();

  const times = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    return {
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });

  return times.map((t) => ({
    month: t.month,
    year: t.year,
    budget: budgets.filter(
      (b) =>
        Number(b.date?.slice(0, 4)) === t.year &&
        Number(b.date?.slice(5, 7)) === t.month + 1,
    ),
  }));
}
