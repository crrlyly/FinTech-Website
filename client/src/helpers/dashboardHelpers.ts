import type { Transaction } from "../models/Transaction";

export function getTotalBalance(transactions: Transaction[]): number {
  return transactions.reduce((a, t) => {
    if (t.type === "income") {
      a += Number(t.amount);
    }
    if (t.type === "expense") {
      a -= Number(t.amount);
    }
    return a;
  }, 0);
}

export function getMonthlyIncome(
  transactions: Transaction[],
): [number, number] {
  const now: Date = new Date();
  const currMonth: number = now.getMonth() + 1;
  const currYear: number = now.getFullYear();
  const lastMonth: number = currMonth === 1 ? 12 : currMonth - 1;
  const lastMonthYear: number = lastMonth === 12 ? currYear - 1 : currYear;

  const currIncome: number = transactions
    .filter(
      (t) =>
        t.type === "income" &&
        Number(t.date.slice(5, 7)) === currMonth &&
        Number(t.date.slice(0, 4)) === currYear,
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);

  const lastIncome: number = transactions
    .filter(
      (t) =>
        t.type === "income" &&
        Number(t.date.slice(5, 7)) === lastMonth &&
        Number(t.date.slice(0, 4)) === lastMonthYear,
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);

  const percentage: number = ((currIncome - lastIncome) / lastIncome) * 100;

  return [currIncome, percentage];
}

export function getMonthlyExpenses(
  transactions: Transaction[],
): [number, number] {
  const now: Date = new Date();
  const currMonth: number = now.getMonth() + 1;
  const currYear: number = now.getFullYear();
  const lastMonth: number = currMonth === 1 ? 12 : currMonth - 1;
  const lastMonthYear: number = lastMonth === 12 ? currYear - 1 : currYear;

  const currExpenses: number = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        Number(t.date.slice(5, 7)) === currMonth &&
        Number(t.date.slice(0, 4)) === currYear,
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);

  const lastExpenses: number = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        Number(t.date.slice(5, 7)) === lastMonth &&
        Number(t.date.slice(0, 4)) === lastMonthYear,
    )
    .reduce((a, t) => {
      a += Number(t.amount);
      return a;
    }, 0);

  const percentage: number =
    ((currExpenses - lastExpenses) / lastExpenses) * 100;

  return [currExpenses, percentage];
}

export async function currencyConverter(
  money: number,
  from: string,
  to: string,
): Promise<string> {
  try {
    const currencyLocales: Record<string, string> = {
      USD: "en-US",
      EUR: "fr-FR",
      GBP: "en-GB",
      JPY: "ja-JP",
      CAD: "en-CA",
      AUD: "en-AU",
      INR: "en-IN",
      MXN: "es-MX",
    };
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (!response.ok) {
      throw new Error("API network response failed");
    }
    const data = await response.json();
    const conversionRate = data.rates[to];
    const convertedAmount = money * conversionRate;
    return convertedAmount.toLocaleString(currencyLocales[to], {
      style: "currency",
      currency: to,
    });
  } catch (error) {
    console.error("Error fetching currency: ", error);
    throw error;
  }
}

export function changeCurrencySymbol(money: number, from: string): string {
  const currencyLocales: Record<string, string> = {
    USD: "en-US",
    EUR: "fr-FR",
    GBP: "en-GB",
    JPY: "ja-JP",
    CAD: "en-CA",
    AUD: "en-AU",
    INR: "en-IN",
    MXN: "es-MX",
  };
  return money.toLocaleString(currencyLocales[from], {
    style: "currency",
    currency: from,
  });
}

export function projectedValueCalc(
  initial: number,
  contribution: number,
  duration: number,
  annualReturn: number,
): number[] {
  const fullContribution = duration * 12 * contribution + initial;
  const monthlyRate = annualReturn / 100 / 12;
  const months = duration * 12;
  let currentBalance = initial;

  for (let i = 0; i < months; i++) {
    const earnedInterest = currentBalance * monthlyRate;
    currentBalance = currentBalance + earnedInterest + contribution;
  }

  const fullInterest = currentBalance - fullContribution;
  const projectedValue = fullContribution + fullInterest;

  return [projectedValue, fullContribution, fullInterest];
}
