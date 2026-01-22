import { API_BASE_URL } from "../config";

export default async function loginUser (payload) {
try {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

    let data;

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      console.error(data.message || "Ошибка при авторизации");
      return { ok: false, status: response.status, data };
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }
    
    console.error("❌ Ошибка при авторизации:", err);
  }
}