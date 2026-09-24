import TopNav from "../../components/app/shared/TopNav";
import SavingsHeader from "../../components/app/savings/SavingsHeader";
import SavingsStats from "../../components/app/savings/SavingsStats";
import Tip from "../../components/app/shared/Tip";
import SavingsList from "../../components/app/savings/SavingsList";

const Savings = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative flex flex-col`}>
      <TopNav title="Savings Goals"></TopNav>
      <SavingsHeader></SavingsHeader>
      <SavingsStats></SavingsStats>
      <Tip tipString={`Your total balance is what you actually have. Money in goals is set aside — \"available to spend\" is what's left over for everyday use.`} ></Tip>
      <SavingsList></SavingsList>
    </div>
  );
};

export default Savings;
