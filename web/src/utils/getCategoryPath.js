export const getCategoryPath = (user) => {
  if (!user || !user.role) return "/";
  
  switch (user.role) {
    case "Oragnizer":
      return "/organizator";
    case "Judge":
      switch (user.categoryId) {
        case 1:
          if (user.isRoboticsTheory) {
            return "/robotics/teoria/loginPaticapent";
          }
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