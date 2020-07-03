import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

const customLevels = {
  error: 0,
  warning: 1,
  success: 2,
  info: 3,
  debug: 4,
};

const backgrounds = {
  error: 'bgRed',
  warning: 'bgYellow',
  success: 'bgGreen',
  info: 'bgBlue',
  debug: 'bgWhite',
};

const coloredFormat = format.printf(({ level, message }) => {
  const bgColor = backgrounds[level];
  return `${chalk.black[bgColor](` ${level.toUpperCase()} `)} ${message}`;
});

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  levels: customLevels,
  format: format.combine(
    format.splat(),
    coloredFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
