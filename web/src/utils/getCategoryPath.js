export const getCategoryPath = (user) => {
  if (!user || !user.role) return "/";
  
  switch (user.role) {
    case "Организатор":
      return "/organizator";
    case "Судья":
      switch (user.categoryId) {
        case 1:
          return "/robotics/practic/loginPaticapent";
        case 2:
          return "/robotics/teoria/loginPaticapent";
        default:
          return "/";
      }
    default:
      return "/";
  }
};