import { useEffect, useState } from "react";
import GlobalFilters from "../components/filters/GlobalFilters";
import KpiCard from "../components/kpi/KpiCard";
import { getActiveStoresKpis } from "../api/dashboardApi";
import { useFilters } from "../context/FilterContext";

export default function StoresDashboard() {
  const { filters } = useFilters();
  const [kpi, setKpi] = useState<any>({});

  useEffect(() => {
    getActiveStoresKpis(filters).then((res) => setKpi(res.data.data));
  }, [filters]);

  return (
    <>
      Hello from Stores Dashboard
      <GlobalFilters />
      <KpiCard title="Total Active Stores" value={kpi.totalActiveStores} />
      <KpiCard title="YoY Change %" value={kpi.yoyChangePercent} />
    </>
  );
}
