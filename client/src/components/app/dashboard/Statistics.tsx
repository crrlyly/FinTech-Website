import StatisticCard from "./StatisticCard";

const Statistics = () => {
  return (
    <div className={`bg-blue-200 w-full h-auto flex flex-col p-5 gap-5`}>
      <StatisticCard></StatisticCard>
      <StatisticCard></StatisticCard>
      <StatisticCard></StatisticCard>
      <StatisticCard></StatisticCard>
    </div>
  );
};

export default Statistics;
