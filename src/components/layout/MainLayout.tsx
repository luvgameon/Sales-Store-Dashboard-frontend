// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../navbar/ResponsiveAppBar";

const MainLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet /> {/* All pages render here */}
    </>
  );
};

export default MainLayout;
