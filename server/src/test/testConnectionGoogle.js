const logger = require('../services/loggerNew/logger');
const jwtSpreadsheet = require('../services/spreadsheet/authSpreadsheet');


const TestConnectToGoogle = async () => {
    try {
        const response = await jwtSpreadsheet.request({
            url: 'https://www.googleapis.com/discovery/v1/apis',
        });

        logger.google.success('Соединение с Google API успешно установлено!')

        return true;
    } catch (error) {
        logger.google.error('Ошибка соединения с Google API:', error);
        return false;
    }
};

module.exports = TestConnectToGoogle;