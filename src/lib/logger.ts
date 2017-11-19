import { Logger, LoggerInstance, transports } from 'winston';

const mode = process.env.NODE_ENV || 'development';

const modes = {
    development: new transports.Console({
        level: 'silly',
        colorize: true,
        handleExceptions: true,
    }),
    production: new transports.Console({
        level: 'error',
        colorize: true,
        handleExceptions: true,
    }),
    test: new transports.Console({
        level: 'error',
        colorize: true,
        handleExceptions: true,
    }),
};

export const logger: LoggerInstance = new Logger({
    transports: [
        modes[mode]
    ],
    exitOnError: true,
});
