import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useFilters } from '@/context/FilterContext';
import { fetchSalesByRegion } from '@/api/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe } from 'lucide-react';

interface RegionData {
  region: string;
  sales: number;
  growth: string;
  stores: number;
}

const COLORS = [
  'hsl(142, 76%, 36%)',
  'hsl(142, 76%, 42%)',
  'hsl(142, 76%, 48%)',
  'hsl(142, 76%, 54%)',
  'hsl(142, 76%, 60%)',
];

const SalesByRegionChart: React.FC = () => {
  const { filters } = useFilters();
  const [data, setData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchSalesByRegion(filters);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [filters]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{item.region}</p>
          <p className="text-sm text-muted-foreground">
            Sales: <span className="text-foreground font-medium">{formatCurrency(item.sales)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Growth: <span className={parseFloat(item.growth) >= 0 ? 'text-success' : 'text-destructive'}>
              {item.growth}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Stores: <span className="text-foreground">{item.stores}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-success" />
          <h3 className="text-lg font-semibold text-foreground">Sales by Region</h3>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-success" />
        <h3 className="text-lg font-semibold text-foreground">Sales by Region</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart 
          data={data} 
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="region" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="sales" 
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByRegionChart;
