// src/api.js

export const API_BASE = "https://nairobi-booking-1.onrender.com/api/stays";

export const getStays = async () => {
  const response = await fetch(`${API_BASE}/stays`);
  if (!response.ok) throw new Error("Failed to fetch stays");
  return response.json();
};

export const getStay = async (id) => {
  const response = await fetch(`${API_BASE}/stays/${id}`);
  if (!response.ok) throw new Error("Failed to fetch stay");
  return response.json();
};
