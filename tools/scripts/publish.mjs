import { readCachedProjectGraph } from '@nrwl/devkit'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import chalk from 'chalk'

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message))
    process.exit(1)
  }
}

const PUBLISH_PROJECT_NAME = 'insight-viewer'

const graph = readCachedProjectGraph()
const project = graph.nodes[PUBLISH_PROJECT_NAME]

const outputPath = project.data?.targets?.build?.options?.outputPath

invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${PUBLISH_PROJECT_NAME}". Is project.json configured  correctly?`
)

process.chdir(outputPath)

// Execute "npm publish" to publish
try {
  const json = JSON.parse(readFileSync(`package.json`).toString())

  execSync('npm publish --access public')
} catch (e) {
  console.error(chalk.bold.red(`Error reading package.json file from library build output.`))
}
