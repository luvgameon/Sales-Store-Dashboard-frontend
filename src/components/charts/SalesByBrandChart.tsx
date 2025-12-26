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
import { fetchSalesByBrand } from '@/api/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3 } from 'lucide-react';

interface BrandData {
  brand: string;
  sales: number;
  growth: string;
  orders: number;
}

interface SalesByBrandChartProps {
  onBrandClick?: (brand: string) => void;
}

const COLORS = [
  'hsl(217, 91%, 60%)',
  'hsl(217, 91%, 65%)',
  'hsl(217, 91%, 70%)',
  'hsl(217, 91%, 75%)',
  'hsl(217, 91%, 80%)',
];

const SalesByBrandChart: React.FC<SalesByBrandChartProps> = ({ onBrandClick }) => {
  const { filters } = useFilters();
  const [data, setData] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchSalesByBrand(filters);
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
          <p className="font-medium text-foreground mb-2">{item.brand}</p>
          <p className="text-sm text-muted-foreground">
            Sales: <span className="text-foreground font-medium">{formatCurrency(item.sales)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Growth: <span className={parseFloat(item.growth) >= 0 ? 'text-success' : 'text-destructive'}>
              {item.growth}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Orders: <span className="text-foreground">{item.orders.toLocaleString()}</span>
          </p>
          <p className="text-xs text-primary mt-2">Click to drill down</p>
        </div>
      );
    }
    return null;
  };

  const handleClick = (data: any) => {
    if (onBrandClick && data) {
      onBrandClick(data.brand);
    }
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Sales by Brand</h3>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Sales by Brand</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tickFormatter={formatCurrency}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            type="category" 
            dataKey="brand"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="sales" 
            radius={[0, 4, 4, 0]}
            cursor="pointer"
            onClick={handleClick}
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

export default SalesByBrandChart;
