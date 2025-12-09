import { jwtDecode } from "jwt-decode";

export const allowToGoCategory = (token, allowToGo) => {
  try {
    // Проверка на null/undefined
    if (!token) return false;
    
    const decoded = jwtDecode(token);
    const categoryId = decoded.categoryId;

    return categoryId === allowToGo;

  } catch (error) {
    console.error("Invalid token:", error);
    return false; // ← Возвращаем false, а не "/"
  }
};