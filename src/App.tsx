import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesDashboard from "./pages/SalesDashboard";
import StoresDashboard from "./pages/StoresDashboard";
import { FilterProvider } from "./context/FilterContext";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes WITH Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<SalesDashboard />} />
            <Route path="/stores" element={<StoresDashboard />} />
          </Route>

          {/* Route WITHOUT Navbar */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}
