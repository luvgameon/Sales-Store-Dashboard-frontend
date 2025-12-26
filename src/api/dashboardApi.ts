import { FilterState } from "@/context/FilterContext";
import axios from "axios";

// Mock data generators for demo purposes
// In production, these would be actual API calls using axios

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];
const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East",
];
const categories = ["Footwear", "Apparel", "Accessories", "Equipment"];
const products = [
  "Running Shoes",
  "Basketball Shoes",
  "T-Shirts",
  "Hoodies",
  "Caps",
  "Bags",
];

// Generate random sales data
const generateMonthlySalesData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month, index) => ({
    month,
    sales: Math.floor(Math.random() * 500000) + 200000,
    lastYear: Math.floor(Math.random() * 450000) + 180000,
    orders: Math.floor(Math.random() * 5000) + 2000,
  }));
};

const generateBrandSalesData = () => {
  return brands
    .map((brand) => ({
      brand,
      sales: Math.floor(Math.random() * 800000) + 300000,
      growth: (Math.random() * 40 - 10).toFixed(1),
      orders: Math.floor(Math.random() * 8000) + 3000,
    }))
    .sort((a, b) => b.sales - a.sales);
};

const generateRegionSalesData = () => {
  return regions
    .map((region) => ({
      region,
      sales: Math.floor(Math.random() * 600000) + 200000,
      growth: (Math.random() * 30 - 5).toFixed(1),
      stores: Math.floor(Math.random() * 200) + 50,
    }))
    .sort((a, b) => b.sales - a.sales);
};

const generateProductSalesData = (brand: string) => {
  return products
    .map((product) => ({
      product,
      brand,
      sales: Math.floor(Math.random() * 200000) + 50000,
      quantity: Math.floor(Math.random() * 10000) + 2000,
    }))
    .sort((a, b) => b.sales - a.sales);
};

const generateActiveStoresTrend = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let baseStores = 450;
  return months.map((month) => {
    baseStores += Math.floor(Math.random() * 30) - 10;
    return {
      month,
      activeStores: baseStores,
      newStores: Math.floor(Math.random() * 20) + 5,
      closedStores: Math.floor(Math.random() * 10),
    };
  });
};

const generateActiveStoresByRegion = () => {
  return regions
    .map((region) => ({
      region,
      activeStores: Math.floor(Math.random() * 150) + 50,
      growth: (Math.random() * 20 - 5).toFixed(1),
    }))
    .sort((a, b) => b.activeStores - a.activeStores);
};

// API Functions
export const fetchSalesKpis = async (filters: FilterState) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const totalSales = Math.floor(Math.random() * 5000000) + 3000000;
  const lastYearSales = Math.floor(Math.random() * 4500000) + 2800000;
  const yoyGrowth = (
    ((totalSales - lastYearSales) / lastYearSales) *
    100
  ).toFixed(1);

  return {
    totalSales,
    yoyGrowth: parseFloat(yoyGrowth),
    topBrand: brands[Math.floor(Math.random() * brands.length)],
    totalOrders: Math.floor(Math.random() * 50000) + 30000,
    avgOrderValue: Math.floor(totalSales / (Math.random() * 50000 + 30000)),
  };
};

export const fetchSalesTrend = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return generateMonthlySalesData();
};

export const fetchSalesByBrand = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return generateBrandSalesData();
};

export const fetchSalesByRegion = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return generateRegionSalesData();
};

export const fetchSalesByProduct = async (
  brand: string,
  filters: FilterState
) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return generateProductSalesData(brand);
};

export const fetchStoresKpis = async (filters: FilterState) => {
  try {
    const res = await axios.post(`${API_BASE}/dashboard/stores/kpis`, filters);
    console.log("API Response for Store KPIs:", res.data);
    if (res.status === 200) {
      return {
        totalActiveStores: res.data.data.totalActiveStores,
        yoyChange: res.data.data.yoyChange,
        newStoresThisYear: res.data.data.newStoresThisYear,
        topRegion: res.data.data.topRegion,
      };
    }
  } catch (error) {
    console.error("Error fetching store KPIs:", error);
    throw error;
  }

  // Fallback to mock data if API does not return data
  // await new Promise((resolve) => setTimeout(resolve, 450));

  // const totalStores = Math.floor(Math.random() * 200) + 500;
  // const lastYearStores = Math.floor(Math.random() * 180) + 450;
  // const yoyChange = (
  //   ((totalStores - lastYearStores) / lastYearStores) *
  //   100
  // ).toFixed(1);

  // return {
  //   totalActiveStores: totalStores,
  //   yoyChange: parseFloat(yoyChange),
  //   newStoresThisYear: Math.floor(Math.random() * 50) + 20,
  //   topRegion: regions[Math.floor(Math.random() * regions.length)],
  // };
};

export const fetchActiveStoresTrend = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 380));
  return generateActiveStoresTrend();
};

export const fetchActiveStoresByRegion = async (filters: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 320));
  return generateActiveStoresByRegion();
};

// Filter options
export const fetchBrands = async () => {
  const res = await axios.get(`${API_BASE}/common/brands`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${API_BASE}/common/categories`);
  return res.data;
};

export const fetchRegions = async () => {
  const res = await axios.get(`${API_BASE}/common/regions`);
  return res.data;
};

const API_BASE = "http://localhost:8080/api";

export const getSalesKpis = (params: unknown) =>
  axios.get(`${API_BASE}/dashboard/sales/kpis`, { params });

export const getSalesTrend = (params: unknown) =>
  axios.get(`${API_BASE}/dashboard/sales/trend`, { params });

export const getSalesByRegion = (params: unknown) =>
  axios.get(`${API_BASE}/dashboard/sales/by-region`, { params });

export const getActiveStoresKpis = (params: unknown) =>
  axios.get(`${API_BASE}/dashboard/stores/kpis`, { params });
