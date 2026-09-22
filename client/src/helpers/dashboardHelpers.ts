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

export function changeCurrencySymbol(
  money: number,
  from: string,
): string {
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
  const projectedValue = (fullContribution + fullInterest);

  return [projectedValue, fullContribution, fullInterest];
}
