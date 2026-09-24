import SavingsCard from "./SavingsCard";

const SavingsList = () => {
  return (
    <div className={`w-full h-auto bg-pink-200 p-5 flex-1 flex flex-col gap-5`}>
      <SavingsCard></SavingsCard>
      <SavingsCard></SavingsCard>
      <SavingsCard></SavingsCard>
      <SavingsCard></SavingsCard>
      <SavingsCard></SavingsCard>
    </div>
  );
};

export default SavingsList;
