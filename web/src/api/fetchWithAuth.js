import { API_BASE_URL } from "../config";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return nowInSeconds < decoded.exp;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

export async function fetchWithAuth(token, url, options = {}, logout, navigate) {

  if (!isTokenValid(token)) {
    if (logout) logout();
    if (navigate) navigate("/");
    return { ok: false, status: 401, data: "Токен недействителен" };
  }
  try {

    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    let data;
    try { data = await res.json(); } catch { data = await res.text(); }

    if (!res.ok) {
      return { ok: false, status: res.status, data };
    }

    return { ok: true, status: res.status, data };
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("Ошибка при fetchWithAuth:", err);
    return { ok: false, status: 0, data: err.message };
  }
}