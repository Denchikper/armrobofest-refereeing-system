const app = require('./src/app');
const logger = require('./src/utils/logger');

const { testConnectionDB } = require('./src/test/testConnectionDB');
const { syncDatabase } = require('./src/utils/databaseSync');


const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_IP = process.env.SERVER_IP;

require('./src/models');

const startServer = async () => {
  try {
    await testConnectionDB(); // проверка соединения с БД
    await syncDatabase();
    
    
    app.listen(SERVER_PORT, SERVER_IP, () => {
      logger.server_success(`Сервер запущен на http://${SERVER_IP}:${SERVER_PORT}`);
    });

  } catch (error) {
    logger.server_error('Ошибка запуска сервера:');
    console.error(error); // Выводим полный объект ошибк
  }
};

startServer();