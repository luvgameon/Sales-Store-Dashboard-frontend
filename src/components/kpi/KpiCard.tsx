import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  prefix?: string;
  suffix?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs last year',
  icon,
  loading = false,
  prefix = '',
  suffix = '',
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${prefix}${(val / 1000000).toFixed(2)}M${suffix}`;
      }
      if (val >= 1000) {
        return `${prefix}${(val / 1000).toFixed(1)}K${suffix}`;
      }
      return `${prefix}${val.toLocaleString()}${suffix}`;
    }
    return `${prefix}${val}${suffix}`;
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendClass = () => {
    if (change === undefined) return '';
    if (change > 0) return 'badge-success';
    if (change < 0) return 'badge-destructive';
    return 'bg-muted text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="kpi-card animate-fade-in">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-32 mb-3" />
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  return (
    <div className="kpi-card animate-fade-in group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-foreground mb-3">
        {formatValue(value)}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center gap-2">
          <span className={`${getTrendClass()} inline-flex items-center gap-1`}>
            {getTrendIcon()}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
