import React, { useEffect, useState } from "react";
import { useFilters } from "@/context/FilterContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, RefreshCw } from "lucide-react";
import { fetchBrands, fetchCategories, fetchRegions } from "@/api/dashboardApi";
import { DatePicker } from "../ui/datepicker";

const GlobalFilters: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    const loadFilterOptions = async () => {
      const [brandsData, categoriesData, regionsData] = await Promise.all([
        fetchBrands(),
        fetchCategories(),
        fetchRegions(),
      ]);
      console.log("Fetched Regions:", regionsData);

      setBrands(brandsData.data);
      setCategories(categoriesData.data);
      setRegions(regionsData.data);
    };
    loadFilterOptions();
  }, []);

  return (
    <div className="filter-panel animate-slide-in-left">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Time Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select
            value={filters.timeRange}
            onValueChange={(value: "month" | "quarter" | "year" | "range") => {
              updateFilter("timeRange", value);

              if (value !== "range") {
                updateFilter("startDate", "");
                updateFilter("endDate", "");
              }
            }}
          >
            <SelectTrigger className="w-[120px] h-9 text-sm">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
              <SelectItem value="range">Select Date Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Date Pickers */}
        {filters.timeRange === "range" && (
          <>
            <DatePicker
              value={filters.startDate}
              onChange={(date) => updateFilter("startDate", date)}
              placeholder="Start Date"
            />
            <DatePicker
              value={filters.endDate}
              onChange={(date) => updateFilter("endDate", date)}
              placeholder="End Date"
            />
          </>
        )}

        {/* Brand Filter */}
        <Select
          value={filters.brand}
          onValueChange={(value) => updateFilter("brand", value)}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter("category", value)}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region Filter */}
        <Select
          value={filters.region}
          onValueChange={(value) => updateFilter("region", value)}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>

            {regions.length > 0 &&
              regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="h-9 gap-2"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default GlobalFilters;
