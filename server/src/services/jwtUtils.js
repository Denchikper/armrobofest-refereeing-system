const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = 3600 * 2;

const generateToken = (userId, role, category_id) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET не установлен в переменных окружения');
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expiresAt = currentTime + JWT_EXPIRES_IN;

  const payload = {
    sub: userId,
    role: role,
    categoryId: category_id,
    iat: currentTime,
    exp: expiresAt
  };

  const options = {
    algorithm: 'HS256'
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

const generateTokenPart = (partId) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET не установлен в переменных окружения');
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expiresAt = currentTime + JWT_EXPIRES_IN;

  const payload = {
    sub: partId,
    role: "PART",
    iat: currentTime,
    exp: expiresAt
  };

  const options = {
    algorithm: 'HS256'
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = (token) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET не установлен в переменных окружения');
  }

  try {
    return jwt.verify(token, JWT_SECRET, { 
      algorithms: ['HS256'],
      complete: true
    });
  } catch (error) {
    return null;
  }
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.payload || !decoded.payload.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.payload.exp < currentTime;
};

const getTokenInfo = (token) => {
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.payload) {
    return null;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expiresIn = decoded.payload.exp - currentTime;
  
  return {
    sub: decoded.payload.sub,
    role: decoded.payload.role,
    categoryId: decoded.payload.categoryId,
    issuedAt: new Date(decoded.payload.iat * 1000).toISOString(),
    expiresIn: expiresIn > 0 ? expiresIn : 0,
  };
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  isTokenExpired,
  getTokenInfo,
  generateTokenPart,
  JWT_EXPIRES_IN
};