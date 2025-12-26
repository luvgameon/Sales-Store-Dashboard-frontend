import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useFilters } from '@/context/FilterContext';
import { fetchActiveStoresTrend } from '@/api/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Store } from 'lucide-react';

interface StoresData {
  month: string;
  activeStores: number;
  newStores: number;
  closedStores: number;
}

const ActiveStoresTrendChart: React.FC = () => {
  const { filters } = useFilters();
  const [data, setData] = useState<StoresData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchActiveStoresTrend(filters);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [filters]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Active Stores Trend</h3>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Store className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Active Stores Trend</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeStores"
            name="Active Stores"
            stroke="hsl(217, 91%, 60%)"
            strokeWidth={3}
            dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="newStores"
            name="New Stores"
            stroke="hsl(142, 76%, 36%)"
            strokeWidth={2}
            dot={{ fill: 'hsl(142, 76%, 36%)', strokeWidth: 2, r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="closedStores"
            name="Closed Stores"
            stroke="hsl(0, 84%, 60%)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(0, 84%, 60%)', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveStoresTrendChart;
