import chalk from 'chalk';

import app from './app';
import logger from './logger';

const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));

server.on('listening', () => {
  const now = new Date();
  const pad = x => (x.toString().length < 2 ? `0${x}` : x).toString();

  logger.success(
    `${chalk.green('Transpilled successully')}        ${chalk.gray(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`)}


Server running at:
  - Local:   ${chalk.cyan(`http://${app.get('host')}:${chalk.bold(port)}/`)}`,
  );
  console.log('\n'.repeat(process.stdout.rows - 7));
});
