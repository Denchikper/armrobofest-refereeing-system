export const allowToGoCategory = (user, categoryId, options = {}) => {
  const { isItRoboticsTheory = false } = options;

  if (!user || !user.role) return false;
  
  // Организатор может везде
  if (user.role === "Oragnizer") return true;
  
  // Судья только в свою категорию
  if (user.role === "Judge") {
    return user.categoryId === categoryId && user.isRoboticsTheory === isItRoboticsTheory;
  }
  
  return false;
};