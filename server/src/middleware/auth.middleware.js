const { getTokenInfo, isTokenExpired } = require('../services/jwtUtils');

const authenticate = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
      }

      const token = authHeader.split(' ')[1];
      const time = isTokenExpired(token);

      if (time) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
      }

      const decoded = getTokenInfo(token);
      req.user = decoded;

      if (allowedRoles.length > 0) {
        const userRole = req.user.role;
        
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ message: 'Доступ к этой категории запрещён' });
        }
      }

      next();
      
    } catch (error) {
      console.error('Ошибка аутентификации:', error.message);
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
      }
      
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
};

const requireAuth = authenticate();

module.exports = { authenticate, requireAuth };