const chalk = require('chalk');
const { server } = require('./logger');

const STATUS_ICON = {
    200: 'success',
    201: 'success',
    204: 'success',
    400: 'warning',
    401: 'warning',
    402: 'warning',
    403: 'warning',
    404: 'warning',
    409: 'warning',
    422: 'warning',
    500: 'error'
};

const ICONS = {
    info: 'i',
    success: '✓',
    error: '✗',
    warning: '!'
};

const COLORS = {
    timestamp: chalk.gray,
    service: chalk.white,
    module: chalk.cyan,
    method: chalk.white,
    path: chalk.blue,
    size: chalk.gray,
    reqId: chalk.gray,
    error: chalk.red,
    success: chalk.green,
    modules: {
        http: chalk.white.bgCyan.bold(' HTTP '),
        auth: chalk.white.bgMagenta.bold(' AUTH '),
        server: chalk.bgHex("#b3ff00").white.bold(' <SR> '),
        db: chalk.black.bgHex("#d9ead3").bold(' <DB> '),
        fraud_rules: chalk.white.bgHex("#3500c5").bold(' <FR> ')
    },
    status: {
        200: chalk.green,
        201: chalk.green,
        204: chalk.green,
        400: chalk.yellow,
        401: chalk.yellowBright,
        402: chalk.yellowBright,
        403: chalk.yellowBright,
        404: chalk.yellowBright,
        409: chalk.yellowBright,
        422: chalk.yellowBright,
        500: chalk.red.bold
    }
};

module.exports = { STATUS_ICON, ICONS, COLORS };