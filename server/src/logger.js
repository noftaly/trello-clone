import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

const backgrounds = {
  info: 'bgCyan',
  error: 'bgRed',
  success: 'bgGreen',
  warn: 'bgYellow',
  warning: 'bgYellow',
};

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.printf(info => `${chalk.black[backgrounds[info.level]](` ${info.level.toUpperCase()} `)} ${info.message}`),
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
