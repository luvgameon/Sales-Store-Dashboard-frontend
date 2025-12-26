import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KpiCard from "@/components/kpi/KpiCard";
import ActiveStoresTrendChart from "@/components/charts/ActiveStoresTrendChart";
import ActiveStoresByRegionChart from "@/components/charts/ActiveStoresByRegionChart";
import { useFilters } from "@/context/FilterContext";
import { fetchStoresKpis } from "@/api/dashboardApi";
import { Store, TrendingUp, PlusCircle, MapPin } from "lucide-react";

interface StoresKpis {
  totalActiveStores: number;
  yoyChange: number;
  newStoresThisYear: number;
  topRegion: string;
}

const StoresDashboard: React.FC = () => {
  const { filters, isDateRangeReady } = useFilters();
  const [kpis, setKpis] = useState<StoresKpis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isDateRangeReady) return;
    const loadKpis = async () => {
      setLoading(true);
      const data = await fetchStoresKpis(filters);
      console.log("Fetched Store KPIs:", data);
      setKpis(data);
      setLoading(false);
    };
    loadKpis();
    console.log("Filters in StoresDashboard:", filters);
  }, [filters, isDateRangeReady]);

  return (
    <DashboardLayout
      title="Stores Dashboard"
      subtitle="Monitor active stores and regional distribution"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Active Stores"
          value={kpis?.totalActiveStores || 0}
          change={kpis?.yoyChange}
          icon={<Store className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="YoY Change"
          value={`${kpis?.yoyChange || 0}%`}
          change={kpis?.yoyChange}
          changeLabel="compared to last year"
          icon={<TrendingUp className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="New Stores"
          value={kpis?.newStoresThisYear || 0}
          icon={<PlusCircle className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="Top Region"
          value={kpis?.topRegion || "-"}
          icon={<MapPin className="w-5 h-5" />}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveStoresTrendChart />
        <ActiveStoresByRegionChart />
      </div>
    </DashboardLayout>
  );
};

export default StoresDashboard;
