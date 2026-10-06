import StatCard from "./StatCard";

const Statistics = () => {
  return (
    <div
      className={`w-full h-auto bg-(--primary) flex flex-col justify-center p-5 gap-5`}
    >
      <StatCard action="spending this month" value={0.0}></StatCard>
      <StatCard action="spending this month" value={0.0}></StatCard>
      <StatCard action="spending this month" value={0.0}></StatCard>
    </div>
  );
};

export default Statistics;
