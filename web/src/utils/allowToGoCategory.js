export const allowToGoCategory = (user, categoryId) => {
  if (!user || !user.role) return false;
  
  // Организатор может везде
  if (user.role === "Организатор") return true;
  
  // Судья только в свою категорию
  if (user.role === "Судья") {
    return user.categoryId === categoryId;
  }
  
  return false;
};