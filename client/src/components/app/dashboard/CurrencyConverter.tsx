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
      className={`w-full h-auto bg-(--primary) flex justify-center items-center p-5`}
    >
      <div className={`w-full h-auto bg-(--card) rounded-2xl text-white p-7 border border-white/10`}>
        <div className={`flex items-center text-[1.2rem] font-semibold mb-5`}>
          <span className="material-symbols-outlined text-green-500 mr-2">
            currency_exchange
          </span>
          Currency Converter
        </div>
        <div>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-(--greyText)`}>Amount</label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={`flex justify-between gap-3`}>
            <div className={`flex flex-col flex-1`}>
              <label className={`text-(--greyText)`} htmlFor="">From</label>
              <select
                className={`bg-white/10 border border-white/10 pr-10 rounded-[5px] py-1`}
                name="from"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <CurrencyDropdown></CurrencyDropdown>
              </select>
            </div>
            <div className={`flex flex-col flex-1 text-white`}>
              <label className={`text-(--greyText)`} htmlFor="">To</label>
              <select
                className={`bg-white/10 border border-white/10 pr-10 rounded-[5px] py-1 `}
                name="to"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <CurrencyDropdown></CurrencyDropdown>
              </select>
            </div>
          </div>
          <div className={`flex items-center justify-between text-(--greyText) bg-(--purple)/10  rounded-[5px] px-3 py-2 mt-5`} >
            {changeCurrencySymbol(Number(amount), from)}
            <span className="material-symbols-outlined text-(--purple) text-[.9rem]!">arrow_forward</span>
            <span className={`text-white font-bold`}>{converted || "$0.00"}</span>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
