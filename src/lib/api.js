// src/lib/api.js
import axios from "axios";

// Normalize and default to 5000 (not 5050)
export const API_URL =
  (import.meta.env.VITE_API_URL
    ? String(import.meta.env.VITE_API_URL).replace(/\/$/, "")
    : "") || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // keep true if you rely on cookies/sessions
});

// Build absolute asset URL from a relative path
export const assetURL = (p) => {
  const s = String(p || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `${API_URL}/${s.replace(/^\//, "")}`;
};

export default api;