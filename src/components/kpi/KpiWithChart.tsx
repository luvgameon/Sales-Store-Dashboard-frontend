import { Card, CardContent, Typography, Box } from "@mui/material";
import { useState } from "react";
import ChartSwitcher from "../charts/ChartSwitcher";
import BarChartView from "../charts/BarChartView";
import PieChartView from "../charts/PieChartView";
import SalesTrendChart from "../charts/SalesTrendChart";

export default function KpiWithChart({ title, value, data, xKey, yKey }: any) {
  const [chartType, setChartType] = useState("line");

  const renderChart = () => {
    if (chartType === "pie") {
      return <PieChartView data={data} nameKey={xKey} valueKey={yKey} />;
    }
    if (chartType === "bar") {
      return <BarChartView data={data} xKey={xKey} yKey={yKey} />;
    }
    return <SalesTrendChart data={data} chartType={chartType} />;
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5" mb={2}>
          {value}
        </Typography>

        <ChartSwitcher chartType={chartType} setChartType={setChartType} />

        <Box>{renderChart()}</Box>
      </CardContent>
    </Card>
  );
}
