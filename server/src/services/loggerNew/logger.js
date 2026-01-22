const chalk = require('chalk');

const STATUS_ICON = require('./logger.config').STATUS_ICON;
const ICONS = require('./logger.config').ICONS; 
const COLORS = require('./logger.config').COLORS;

function getTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const millis = now.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${millis}`;
}

function getDurationColor(duration) {
    if (typeof duration === 'string') {
        const match = duration.match(/(\d+)/);
        if (!match) return chalk.gray(duration);
        duration = parseInt(match[1]);
    }
    
    if (duration >= 1000) return chalk.red(`${duration}ms`);
    if (duration >= 500) return chalk.yellow(`${duration}ms`);
    if (duration >= 100) return chalk.green(`${duration}ms`);
    return chalk.gray(`${duration}ms`);
}

function generateRequestId() {
    return Math.random().toString(36).substring(2, 10);
}

function getSafeSize(req) {
    if (!req.body) return '0B';
    
    try {
        if (Buffer.isBuffer(req.body)) {
            return `${req.body.length}B`;
        }
        
        if (typeof req.body === 'string') {
            return `${req.body.length}B`;
        }
        
        if (typeof req.body === 'object') {
            const json = JSON.stringify(req.body);
            return `${json.length}B`;
        }
        
        return '0B';
    } catch {
        return '0B';
    }
}

const logger = {
    error: (message, err, requestId = generateRequestId()) => {
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.server;
            const icon = COLORS.error(`[${ICONS.error}]`);
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} ${message} ${reqId}`);
            console.log(err);
    },

    http: {
        incoming: (method, path, req, requestId = generateRequestId()) => {
            const size = getSafeSize(req);
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.http;
            const icon = chalk.blue(`[${ICONS.info}]`);
            const methodColored = COLORS.method(method || 'GET');
            const pathColored = COLORS.path(path || '/');
            const sizeColored = COLORS.size(size ? `${size}` : '0B');
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} → ${methodColored} ${pathColored} ${sizeColored} ${reqId}`);
            return requestId;
        },
        
        outgoing: (path, status, duration, size = '0B', requestId = generateRequestId()) => {
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.http;
            const pathColored = chalk.blue(path || '/');

            const statusNum = parseInt(status) || 200;
            const statusColor = COLORS.status[statusNum] || chalk.green;
            const statusColored = statusColor(statusNum);

            const IconName = STATUS_ICON[statusNum] || 'success';
            const IconSymbol = ICONS[IconName] || COLORS.icons.success;
            const icon = statusColor(`[${IconSymbol}]`); 

            const durationNum = parseInt(duration) || 0;
            const durationColored = getDurationColor(durationNum);

            const sizeColored = COLORS.size(size || '0B');
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} ← ${statusColored} ${pathColored} ${durationColored} ${sizeColored} ${reqId}`);
            return requestId;
        },
        

    },

    server: {
        start_success: (address, requestId = generateRequestId()) => {
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.server;
            const icon = COLORS.success(`[${ICONS.success}]`);
            const coloredaddress = chalk.cyan(address);
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} Сервер запущен на ${coloredaddress} ${reqId}`);
            return requestId;
        }
    },

    db: {
        success: (message, requestId = generateRequestId()) => {
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.db;
            const icon = COLORS.success(`[${ICONS.success}]`);
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} ${message} ${reqId}`);
            return requestId;
        },
        
        error: (message, err, requestId = generateRequestId()) => {
            const timestamp = COLORS.timestamp(getTimestamp());
            const module = COLORS.modules.db;
            const icon = COLORS.error(`[${ICONS.error}]`);
            const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
            
            console.log(`${timestamp}  |  ${module} ${icon} ${message} ${reqId}`);
            console.log(err)
            return requestId;
        },
    },
    auth: {
            errorAuth: (code, id, message, judgeId = false, requestId = generateRequestId()) => {
                const timestamp = COLORS.timestamp(getTimestamp());
                const module = COLORS.modules.auth;
                const icon = COLORS.error(`[${ICONS.error}]`);
                const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
                const coloredId = id ? "(" + chalk.cyan(id) + ")": "";
                const coloredCode = chalk.hex("#e4a802")("CODE_P: ") + chalk.cyan(code);
                const coloredJudgeId = chalk.hex("#e4a802")("J-ID: ") + chalk.cyan(judgeId) || false;

                console.log(`${timestamp}  |  ${module} ${icon} ${message} ${coloredJudgeId ? coloredJudgeId : ""} ${coloredCode} ${coloredId} ${reqId}`);
                return requestId;
            },
            loginPart: (code, id, judgeId = false, requestId = generateRequestId()) => {
                const timestamp = COLORS.timestamp(getTimestamp());
                const module = COLORS.modules.auth;
                const icon = chalk.blue(`[${ICONS.info}]`);
                const coloredId = chalk.cyan(id);
                const coloredCode = chalk.hex("#e4a802")("CODE_P: ") + chalk.cyan(code);
                const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);
                const coloredJudgeId = chalk.hex("#e4a802")("J-ID: ") + chalk.cyan(judgeId);

                console.log(`${timestamp}  |  ${module} ${icon} Участник авторизовался! ${judgeId ? coloredJudgeId : ""} ${coloredCode} (${coloredId}) ${reqId}`);
                return requestId;
            },
            login: (code, id, isOrganizer, requestId = generateRequestId()) => {
                const timestamp = COLORS.timestamp(getTimestamp());
                const module = COLORS.modules.auth;
                const icon = chalk.blue(`[${ICONS.info}]`);
                const coloredId = chalk.cyan(id);
                const coloredCode = chalk.hex("#e4a802")("CODE: ") + chalk.cyan(code);
                const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);

                console.log(`${timestamp}  |  ${module} ${icon} ${isOrganizer ? "Организатор": 'Судья'} авторизовался! ${coloredCode} (${coloredId}) ${reqId}`);
                return requestId;
            },
            register: (isSuccess, code, id, role, requestId = generateRequestId()) => {
                const timestamp = COLORS.timestamp(getTimestamp());
                const module = COLORS.modules.auth;
                const icon = chalk.blue(`[${ICONS.info}]`);
                const coloredId = chalk.cyan(id) || null;
                const coloredCode = chalk.hex("#e4a802")("CODE: ") + chalk.cyan(code);
                const coloredRole = chalk.cyan(role);
                const reqId = COLORS.reqId(`[${requestId || generateRequestId()}]`);

                if (isSuccess) {
                    console.log(`${timestamp}  |  ${module} ${icon} Пользователь зарегистрирован: ${coloredCode} (${coloredId}, ${coloredRole}) ${reqId}`);
                } else {
                    console.log(`${timestamp}  |  ${module} ${icon} Ошибка регистрации: ${coloredCode} (${coloredRole}) ${reqId}`);
                }
                return requestId;
            },
        },
};

module.exports = logger;