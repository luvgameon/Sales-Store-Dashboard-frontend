import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GlobalFilters from "../components/filters/GlobalFilters";
import KpiCard from "../components/kpi/KpiCard";
import SalesTrendChart from "../components/charts/SalesTrendChart";
import { getSalesKpis, getSalesTrend } from "../api/dashboardApi";
import { useFilters } from "../context/FilterContext";

export default function SalesDashboard() {
  const { filters } = useFilters();
  const [kpis, setKpis] = useState<any>({});
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    getSalesKpis(filters).then((res) => setKpis(res.data.data));
    getSalesTrend(filters).then((res) => setTrend(res.data.data));
  }, [filters]);

  return (
    <>
      <GlobalFilters />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <KpiCard title="Total Sales" value={kpis.totalSales} />
        </Grid>
        <Grid item xs={4}>
          <KpiCard title="YoY Growth %" value={kpis.yoyGrowthPercent} />
        </Grid>
        <Grid item xs={4}>
          <KpiCard title="Top Brand" value={kpis.topBrand} />
        </Grid>
      </Grid>

      <SalesTrendChart data={trend} />
    </>
  );
}
