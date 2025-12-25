import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesDashboard from "./pages/SalesDashboard";
import StoresDashboard from "./pages/StoresDashboard";
import { FilterProvider } from "./context/FilterContext";

export default function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SalesDashboard />} />
          <Route path="/stores" element={<StoresDashboard />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}
