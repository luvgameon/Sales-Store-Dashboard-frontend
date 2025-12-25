import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function SalesTrendChart({ data }: any) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="period" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#1976d2" />
    </LineChart>
  );
}
