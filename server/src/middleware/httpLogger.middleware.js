const logger = require('../services/loggerNew/logger');

const requestLogger = (req, res, next) => {
    const requestId = logger.http.incoming(
        req.method,
        req.originalUrl,
        req
    );
    
    req.requestId = requestId;
    req._startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - req._startTime;
        
        const contentLength = res.get('Content-Length');
        const size = contentLength ? `${contentLength}B` : '0B';
        
        logger.http.outgoing(
            req.originalUrl,
            res.statusCode,
            duration,
            size,
            requestId,
            res
        );
    });
    
    res.on('error', (err) => {
        console.log(res)
        logger.http.error(
            req.originalUrl,
            res.statusCode || 500,
            requestId
        );
    });
    
    next();
};

module.exports = requestLogger;