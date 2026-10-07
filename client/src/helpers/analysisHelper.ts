import type { Transaction } from "../models/Transaction";

//Get expenses for current month
export function getCurrentMonthExpenses(transactions: Transaction[]): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  //this year and this month
  return transactions
    .filter(
      (t) =>
        Number(t.date.slice(0, 4)) === year &&
        month === Number(t.date.slice(5, 7)) - 1 &&
        t.type === "expense",
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);
}

export function getLastMonthExpenses(transactions: Transaction[]): number {
  const now = new Date();
  const pastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  //this year and this month
  return transactions
    .filter(
      (t) =>
        Number(t.date.slice(0, 4)) === year &&
        pastMonth === Number(t.date.slice(5, 7)) - 1 &&
        t.type === "expense",
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);
}
