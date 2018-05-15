const semver = require('semver')
const chalk = require('chalk')
const logger = require('./logger')
const packageConfig = require('../package.json')

const exec = (cmd) => {
  return require('child_process')
    .execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = () => {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i += 1) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`当前 ${mod.name} 版本为: ${chalk.yellow(mod.currentVersion)}, 推荐为: ${chalk.green(mod.versionRequirement)}`)
    }
  }

  if (warnings.length) {
    console.log()
    logger.warn(chalk.yellow.bold('请更新本地开发环境以支持该工作流正常运行:'))
    logger.warn(chalk.yellow.bold('推荐使用 nvm 管理 node 版本，以保留各 node 版本下的开发环境:'))
    console.log()
    for (let i = 0; i < warnings.length; i += 1) {
      const warning = warnings[i]
      logger.info(`  ${warning}`)
    }
    console.log()
    process.exit(1)
  }
}
