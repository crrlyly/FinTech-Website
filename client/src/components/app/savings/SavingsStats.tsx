import StatCard from "../shared/StatCard";

const SavingsStats = () => {
  return (
    <div className={`w-full h-auto bg-(--primary) p-5 grid grid-cols-2 [grid-template-areas:'balance_saved'_'available_available'] gap-5`}>
      <StatCard area="balance"></StatCard>
      <StatCard area="saved"></StatCard>
      <StatCard area="available"></StatCard>
    </div>
  );
};

export default SavingsStats;