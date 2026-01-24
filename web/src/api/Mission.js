import { fetchWithAuth } from "./fetchWithAuth";

export async function GetMissonsApi(token, logout, navigate) {
try {
    const response = await fetchWithAuth(token, "/missions", { method: "GET" }, logout, navigate);
    let data = response.data;

     if (!response.ok) {
      console.error(data.message || "Ошибка при получении миссий");
      return { ok: false, status: response.status, data };
    }

    return { ok: true, status: response.status, data };
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("❌ Ошибка при авторизации:", err.message);
    throw err;
  }
}

export async function ControlMissionApi(token, payload, logout, navigate) {
try {
    const response = await fetchWithAuth(token, "/missions", {
         method: "PATCH",
         body: JSON.stringify(payload)
        }, logout, navigate);

    let data = response.data;

     if (!response.ok) {
      console.error(data.message || "Ошибка при обновлении миссий");
      return { ok: false, status: response.status, data };
    }

    return { ok: true, status: response.status, data };
  } catch (err) {
    if (err.name === "TypeError") {
      throw new Error("Сервер недоступен. Проверьте соединение");
    }

    console.error("❌ Ошибка при авторизации:", err.message);
    throw err;
  }
}