import { FilterState } from "@/context/FilterContext";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// API Functions
export const fetchSalesKpis = async (filters: FilterState) => {
  try {
    const res = await axios.post(`${API_BASE}/dashboard/sales/kpis`, filters);
    console.log("API Response for Sales KPIs:", res.data);
    if (res.status === 200) {
      return {
        totalSales: res.data.data.totalSales,
        yoyGrowth: res.data.data.yoyGrowth,
        topBrand: res.data.data.topBrand,
        totalOrders: res.data.data.totalOrders,
        avgOrderValue: res.data.data.avgOrderValue,
      };
    }
  } catch (error) {
    console.error("Error fetching sales KPIs:", error);
    throw error;
  }
};

export const fetchSalesTrend = async (year: number) => {
  try {
    const res = await axios.get(`${API_BASE}/dashboard/sales/trendChart`, {
      params: { year },
    });
    console.log("API Response for Sales Trend:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error("Failed to fetch sales trend");
  } catch (error) {
    console.error("Error fetching sales trend:", error);
    throw error;
  }
};

export const fetchSalesByBrand = async (filters: FilterState) => {
  const res = await axios.post(`${API_BASE}/dashboard/sales/by-brand`, filters);
  console.log("API Response for Sales by Brand:", res.data);
  if (res.status === 200) {
    return res.data.data;
  }
  throw new Error("Failed to fetch sales by brand");
};

export const fetchSalesByRegion = async (filters: FilterState) => {
  try {
    const res = await axios.post(
      `${API_BASE}/dashboard/sales/by-region`,
      filters
    );
    console.log("API Response for Sales by Region:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error("Failed to fetch sales by region");
  } catch (error) {
    console.error("Error fetching sales by region:", error);
    throw error;
  }
};

export const fetchSalesByProduct = async (
  brand: string,
  filters: FilterState
) => {
  try {
    const res = await axios.post(
      `${API_BASE}/dashboard/sales/by-brand/products?brand=${brand}`,
      {
        ...filters,
      }
    );
    console.log("API Response for Sales by Product:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error("Failed to fetch sales by product");
  } catch (error) {
    console.error("Error fetching sales by product:", error);
  }
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
};

export const fetchActiveStoresTrend = async (year: number) => {
  try {
    const res = await axios.get(`${API_BASE}/dashboard/stores/trend`, {
      params: { year },
    });
    console.log("API Response for Active Stores Trend:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error("Failed to fetch active stores trend");
  } catch (error) {
    console.error("Error fetching active stores trend:", error);
    throw error;
  }
};

export const fetchActiveStoresByRegion = async (filters: FilterState) => {
  try {
    const res = await axios.post(
      `${API_BASE}/dashboard/stores/by-region`,
      filters
    );
    console.log("API Response for Active Stores by Region:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error("Failed to fetch active stores by region");
  } catch (error) {
    console.log("Error fetching active stores by region:", error);
  }
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
