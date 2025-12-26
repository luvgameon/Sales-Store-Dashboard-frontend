import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import dayjs from "dayjs";

export interface FilterState {
  startDate: string;
  endDate: string;
  brand: string;
  category: string;
  region: string;
  timeRange: "month" | "quarter" | "year" | "range";
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  startDate: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
  brand: "all",
  category: "all",
  region: "all",
  timeRange: "year",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, updateFilter, resetFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType & {
  isDateRangeReady: boolean;
} => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }

  const { filters } = context;

  const isDateRangeReady =
    filters.timeRange !== "range" ||
    (filters.startDate !== "" && filters.endDate !== "");

  return {
    ...context,
    isDateRangeReady,
  };
};
