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
import { fetchActiveStoresByRegion } from '@/api/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

interface RegionStoresData {
  region: string;
  activeStores: number;
  growth: string;
}

const COLORS = [
  'hsl(280, 65%, 60%)',
  'hsl(280, 65%, 65%)',
  'hsl(280, 65%, 70%)',
  'hsl(280, 65%, 75%)',
  'hsl(280, 65%, 80%)',
];

const ActiveStoresByRegionChart: React.FC = () => {
  const { filters } = useFilters();
  const [data, setData] = useState<RegionStoresData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchActiveStoresByRegion(filters);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [filters]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{item.region}</p>
          <p className="text-sm text-muted-foreground">
            Active Stores: <span className="text-foreground font-medium">{item.activeStores}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Growth: <span className={parseFloat(item.growth) >= 0 ? 'text-success' : 'text-destructive'}>
              {item.growth}%
            </span>
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
          <MapPin className="w-5 h-5 text-chart-4" />
          <h3 className="text-lg font-semibold text-foreground">Stores by Region</h3>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-chart-4" />
        <h3 className="text-lg font-semibold text-foreground">Active Stores by Region</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            type="category" 
            dataKey="region"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="activeStores" 
            radius={[0, 4, 4, 0]}
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

export default ActiveStoresByRegionChart;
