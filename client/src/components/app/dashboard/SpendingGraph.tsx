import {
  AreaChart,
  Area,
  XAxis,
  //   YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4200, expenses: 3100 },
  { month: "Mar", income: 3900, expenses: 2700 },
  { month: "Apr", income: 4500, expenses: 3200 },
  { month: "May", income: 4800, expenses: 2900 },
  { month: "Jun", income: 4600, expenses: 3400 },
];

const SpendingGraph = () => {
  return (
    <div className={`w-full h-100 flex justify-center items-center`}>
      <div className={`w-[80%] h-[80%] p-10 border rounded-2xl`}>
        <span className={`text-2xl`}>Spending overview</span>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />

                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="outcomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />

                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
            <XAxis dataKey="month"></XAxis>
            {/* <YAxis /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#incomeGradient)"
            ></Area>

            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#outcomeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingGraph;
