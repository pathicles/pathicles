const chalk = require('chalk');
const loglevel = require('loglevel');
const prefix = require('loglevel-plugin-prefix');



export const errorLevel = "debug"

export default function getLogger(name) {


  const logger = loglevel.getLogger(name)
  logger.setLevel(errorLevel);

  const colors = {
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
  };

  prefix.reg(loglevel);

  prefix.apply(logger, {
    format(level, name, timestamp) {
      return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
    },
  });

  return logger;
}


