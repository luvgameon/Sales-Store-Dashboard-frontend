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
import { fetchSalesByProduct } from '@/api/dashboardApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft } from 'lucide-react';

interface ProductData {
  product: string;
  brand: string;
  sales: number;
  quantity: number;
}

interface ProductDrilldownChartProps {
  brand: string;
  onBack: () => void;
}

const COLORS = [
  'hsl(38, 92%, 50%)',
  'hsl(38, 92%, 55%)',
  'hsl(38, 92%, 60%)',
  'hsl(38, 92%, 65%)',
  'hsl(38, 92%, 70%)',
  'hsl(38, 92%, 75%)',
];

const ProductDrilldownChart: React.FC<ProductDrilldownChartProps> = ({ brand, onBack }) => {
  const { filters } = useFilters();
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchSalesByProduct(brand, filters);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [brand, filters]);

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
          <p className="font-medium text-foreground mb-2">{item.product}</p>
          <p className="text-sm text-muted-foreground">
            Sales: <span className="text-foreground font-medium">{formatCurrency(item.sales)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Quantity: <span className="text-foreground">{item.quantity.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">{brand} - Products</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="chart-container animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">{brand} - Products Breakdown</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Brands
        </Button>
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
            tickFormatter={formatCurrency}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            type="category" 
            dataKey="product"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="sales" 
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

export default ProductDrilldownChart;
