import { Card, CardContent, Typography, Box } from "@mui/material";
import ChartSwitcher from "../charts/ChartSwitcher";

export default function ChartCard({
  title,
  chartType,
  setChartType,
  children,
}: any) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">{title}</Typography>
          <ChartSwitcher chartType={chartType} setChartType={setChartType} />
        </Box>

        <Box sx={{ height: 360 }}>{children}</Box>
      </CardContent>
    </Card>
  );
}
