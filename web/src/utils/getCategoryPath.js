import { jwtDecode } from "jwt-decode";

export const getCategoryPath = (token) => {
  try {
    const decoded = jwtDecode(token);
    const categoryId = decoded.categoryId;

    switch (categoryId) {
      case 1:
        return "/robotics/practic/loginPaticapent";
      case 2:
        return "/robotics/teoria/loginPaticapent";
      case 999:
        return "/organizator";
      default:
        return "/";
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return "/";
  }
};