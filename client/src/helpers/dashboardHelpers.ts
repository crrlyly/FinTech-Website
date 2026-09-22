export function currencyConverter(from: number, country: string): string {
  return from.toLocaleString(country, {
    style: "currency",
    currency: "USD",
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
  const balance = fullContribution + fullInterest;

  return [balance, fullContribution, fullInterest];
}
