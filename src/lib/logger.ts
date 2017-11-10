import { Logger, LoggerInstance, transports } from 'winston';

const mode = {
  debug: new transports.Console({
    level: 'silly',
    colorize: true,
    handleExceptions: true,
  }),
};

export const instance: LoggerInstance = new Logger({
  transports: [
    mode.debug
  ],
  exitOnError: true,
});