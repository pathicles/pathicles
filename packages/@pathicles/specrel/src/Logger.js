import chalk from 'chalk'
import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

export const errorLevel = 'debug'

export default function getLogger(name) {
  const logger = loglevel.getLogger(name)
  logger.setLevel(errorLevel)

  const colors = {
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red
  }

  prefix.reg(loglevel)

  prefix.apply(logger, {
    format(level, name, timestamp) {
      return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](
        level
      )} ${chalk.green(`${name}:`)}`
    }
  })

  return logger
}
