const chalk = require('chalk')

function log(msg, label) {
  console.log(label, msg)
  console.log()
}

exports.success = function (msg) {
  log(msg, chalk.reset.inverse.bold.green(' DONE '))
}

exports.error = function (msg) {
  log(msg, chalk.reset.inverse.bold.red(' FAIL '))
}

exports.warn = function (msg) {
  log(msg, chalk.reset.inverse.bold.yellow(' WARN '))
}

exports.info = function (msg) {
  log(msg, chalk.reset.inverse.bold.cyan(' TIP '))
}
