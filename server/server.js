const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

const app = require('./src/app');
const { testConnectionDB } = require('./src/test/testConnectionDB');
const { syncDatabase } = require('./src/utils/databaseSync');
const logger = require('./src/services/loggerNew/logger');

const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_IP = process.env.SERVER_IP;

require('./src/models');

const startServer = async () => {
  try {
    await testConnectionDB();
    await syncDatabase();

    app.listen(SERVER_PORT, SERVER_IP, () => {
      logger.server.start_success(`http://${SERVER_IP}:${SERVER_PORT}`)
    });

  } catch (error) {
    logger.error('Ошибка запуска сервера:', error);
  }
};

startServer();