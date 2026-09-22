import { useEffect, useState } from "react";
import {
  currencyConverter,
  changeCurrencySymbol,
} from "../../../helpers/dashboardHelpers";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencyConverter = () => {
  // UseState variables for the inputted money, from country currency, to country currency, and final conversion
  const [amount, setAmount] = useState<string>("");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("USD");
  const [converted, setConverted] = useState<string>("");

  // When page loads or amount, from, or to changes and gets rendered, call my currencyConverter function
  // that returns a string promise and set the converted value to that to display the converted value.
  useEffect(() => {
    //Make sure none are empty
    if (amount === "" || from === "" || to === "") {
      setConverted("");
      return;
    }

    async function convert() {
      try {
        const money = await currencyConverter(Number(amount), from, to);
        setConverted(money);
      } catch (error) {
        console.error("Conversion failed:", error);
        setConverted("Conversion unavailable");
      }
    }

    convert();
  }, [amount, from, to]);

  // tsx code
  return (
    <div
      className={`w-full h-auto bg-pink-200 flex justify-center items-center p-5`}
    >
      <div className={`w-full h-auto bg-blue-200`}>
        <div>
          <span className="material-symbols-outlined">currency_exchange</span>
          Currency Converter
        </div>
        <div>
          <div>
            <label htmlFor="">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label htmlFor="">From</label>
              <select
                name="from"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <CurrencyDropdown></CurrencyDropdown>
              </select>
            </div>
            <div>
              <label htmlFor="">To</label>
              <select
                name="to"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <CurrencyDropdown></CurrencyDropdown>
              </select>
            </div>
            <div>
              {changeCurrencySymbol(Number(amount), from)}
              <span className="material-symbols-outlined">arrow_forward</span>
              {converted}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
