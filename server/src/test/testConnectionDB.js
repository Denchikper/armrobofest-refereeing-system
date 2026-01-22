const sequelize = require('../database');
const logger = require('../services/loggerNew/logger');

async function testConnectionDB() {
  try {
    await sequelize.authenticate();
    logger.db.success('Соединение с базой установлено успешно!');
  } catch (error) {
    logger.db.error('Не удалось подключиться к базе!', error);
  }
}

module.exports = { testConnectionDB };