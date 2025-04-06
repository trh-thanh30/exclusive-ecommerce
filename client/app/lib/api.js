import { API_URL } from "../constants/api";

const API_BASE = "https://provinces.open-api.vn/api";

// Lấy danh sách tỉnh/thành phố
export const fetchProvinces = async () => {
  const res = await fetch(`${API_URL}/provinces`);
  if (!res.ok) throw new Error("Failed to fetch provinces");
  return await res.json();
};

// Lấy danh sách quận/huyện theo tỉnh ID
export const fetchDistrictsByProvinceId = async (provinceId) => {
  const res = await fetch(`${API_BASE}/district?idProvince=${provinceId}`);
  if (!res.ok) throw new Error("Failed to fetch districts");
  const data = await res.json();
  return data;
};

// Lấy danh sách phường/xã theo huyện ID
export const fetchWardsByDistrictId = async (districtId) => {
  const res = await fetch(`${API_BASE}/d/${districtId}?depth=2`);
  if (!res.ok) throw new Error("Failed to fetch wards");
  const data = await res.json();
  return data.wards;
};
