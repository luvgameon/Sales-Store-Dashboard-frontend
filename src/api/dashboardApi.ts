import axios from "axios";

const API_BASE = "http://localhost:8080/api/dashboard";

export const getSalesKpis = (params: any) =>
  axios.get(`${API_BASE}/sales/kpis`, { params });

export const getSalesTrend = (params: any) =>
  axios.get(`${API_BASE}/sales/trend`, { params });

export const getSalesByRegion = (params: any) =>
  axios.get(`${API_BASE}/sales/by-region`, { params });

export const getActiveStoresKpis = (params: any) =>
  axios.get(`${API_BASE}/stores/kpis`, { params });
