const sequelize = require('../database');
const logger = require('../services/loggerNew/logger');


async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    logger.db.success('Синхронизация базы данных завершена!');
  } catch (err) {
    db.error('Ошибка при синхронизации базы данных:', err);
    throw err;
  }
}

module.exports = { syncDatabase };