import { API_BASE_URL } from "../config";


export async function loginUser(payload) {
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
      if (response.status === 401) {
        return { ok: false, status: response.status, data };
      } else if (response.status >= 500) {
        return { ok: false, status: response.status, data };
      } else {
        throw new Error(data.message || "Ошибка при авторизации");
      }
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError") {
      // Это обычно network error (сервер не отвечает)
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("❌ Ошибка при авторизации:", err.message);
    throw err;
  }
}