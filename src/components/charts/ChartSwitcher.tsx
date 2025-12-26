import { MenuItem, Select, Box } from "@mui/material";

export default function ChartSwitcher({ chartType, setChartType }: any) {
  return (
    <Box mb={2}>
      <Select
        size="small"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        <MenuItem value="line">Line</MenuItem>
        <MenuItem value="area">Area</MenuItem>
        <MenuItem value="bar">Bar</MenuItem>
        <MenuItem value="pie">Pie</MenuItem>
      </Select>
    </Box>
  );
}
