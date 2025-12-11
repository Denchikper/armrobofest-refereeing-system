import { fetchWithAuth } from "./fetchWithAuth";

export async function loginParticapentRes(token, payload, logout, navigate) {
try {
    const response = await fetchWithAuth(token, "/auth/login-participant", { 
        method: "POST",
        body: JSON.stringify(payload)
     }, logout, navigate);
    let data = response.data;

    if (!response.ok) {
      if (response.status === 401) {
        data = response;
      } else if (response.status === 402) {
        data = response;
      } else if (response.status >= 500) {
        data = response;
      } else {
        throw new Error(data.message || "Ошибка при авторизации");
      }
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("❌ Ошибка при авторизации:", err.message);
    throw err;
  }
}