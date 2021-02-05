var winston = require('winston');

const options = {
    console: {
        level: process.env.LOG_LEVEL || 'silly',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

/**
 * Pure logger function for beauty and asynchrounus logger.
 * Is based on winston library for extend and reuse it.
 * See: https://www.npmjs.com/package/winston
 * Usage
 * const logger = require('path/logger.js')('namespace:label')
 * @param {string} namespace - The labeled namespace
 */

const logger = (namespace) => {
    try {
        const logg = winston.createLogger({
            transports: [
                new winston.transports.Console(options.console)
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ level, message, timestamp, stack }) => {
                    if (typeof message === 'object') {
                        message = JSON.stringify(message, null, 2);
                    }

                    if (stack) {
                        return `[${namespace}] ${level} - ${timestamp} - ${message} -  ${stack}`;
                    }
                    return `[${namespace}] ${level} - ${timestamp} - ${message} `;
                })
            ),
            exitOnError: false, // do not exit on handled exceptions
        });
        return logg;
    } catch (error) {
        console.error(error);
    }
};

module.exports = logger;