const CurrencyDropdown = () => {
  return (
    <>
      <option className="bg-(--card) text-white" value="USD">USD</option>
      <option className="bg-(--card) text-white" value="EUR">EUR</option>
      <option className="bg-(--card) text-white" value="GBP">GBP</option>
      <option className="bg-(--card) text-white" value="JPY">JPY</option>
      <option className="bg-(--card) text-white" value="CAD">CAD</option>
      <option className="bg-(--card) text-white" value="AUD">AUD</option>
      <option className="bg-(--card) text-white" value="INR">INR</option>
      <option className="bg-(--card) text-white" value="MXN">MXN</option>
    </>
  );
};

export default CurrencyDropdown;
