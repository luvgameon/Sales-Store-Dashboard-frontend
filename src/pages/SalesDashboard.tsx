import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KpiCard from "@/components/kpi/KpiCard";
import SalesTrendChart from "@/components/charts/SalesTrendChart";
import SalesByBrandChart from "@/components/charts/SalesByBrandChart";
import SalesByRegionChart from "@/components/charts/SalesByRegionChart";
import ProductDrilldownChart from "@/components/charts/ProductDrilldownChart";
import { useFilters } from "@/context/FilterContext";
import { fetchSalesKpis } from "@/api/dashboardApi";
import { DollarSign, TrendingUp, Award, ShoppingBag } from "lucide-react";

interface SalesKpis {
  totalSales: number;
  yoyGrowth: number;
  topBrand: string;
  totalOrders: number;
  avgOrderValue: number;
}

const SalesDashboard: React.FC = () => {
  const { filters } = useFilters();
  const [kpis, setKpis] = useState<SalesKpis | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const loadKpis = async () => {
      setLoading(true);
      const data = await fetchSalesKpis(filters);
      setKpis(data);
      setLoading(false);
    };
    loadKpis();
  }, [filters]);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
  };

  const handleBackFromDrilldown = () => {
    setSelectedBrand(null);
  };

  return (
    <DashboardLayout
      title="Sales Dashboard"
      subtitle="Real-time sales analytics and performance metrics"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Sales"
          value={kpis?.totalSales || 0}
          change={kpis?.yoyGrowth}
          prefix="₹"
          icon={<DollarSign className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="YoY Growth"
          value={`${kpis?.yoyGrowth || 0}%`}
          change={kpis?.yoyGrowth}
          changeLabel="compared to last year"
          icon={<TrendingUp className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="Top Brand"
          value={kpis?.topBrand || "-"}
          icon={<Award className="w-5 h-5" />}
          loading={loading}
        />
        <KpiCard
          title="Total Orders"
          value={kpis?.totalOrders || 0}
          icon={<ShoppingBag className="w-5 h-5" />}
          loading={loading}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesTrendChart />
        {selectedBrand ? (
          <ProductDrilldownChart
            brand={selectedBrand}
            onBack={handleBackFromDrilldown}
          />
        ) : (
          <SalesByBrandChart onBrandClick={handleBrandClick} />
        )}
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        <SalesByRegionChart />
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;
