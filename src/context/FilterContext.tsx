import { createContext, useContext, useState } from "react";
import dayjs from "dayjs";

const FilterContext = createContext<any>(null);

export const FilterProvider = ({ children }: any) => {
  const [filters, setFilters] = useState({
    startDate: dayjs().startOf("year").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    brand: "",
    category: "",
    region: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
