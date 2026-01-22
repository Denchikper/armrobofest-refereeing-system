import { fetchWithAuth } from "./fetchWithAuth";

export async function loginParticapentRes(token, payload, logout, navigate) {
try {
    const response = await fetchWithAuth(token, "/auth/login-participant", { 
        method: "POST",
        body: JSON.stringify(payload)
     }, logout, navigate);
    let data = response.data;
    return data;
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("❌ Ошибка при авторизации:", err.message);
    throw err;
  }
}