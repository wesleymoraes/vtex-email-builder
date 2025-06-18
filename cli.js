import { build } from './build.js'
import { generateTemplates } from './createTemplates.js'
import { importTemplates } from './importTemplates.js'

const [,, command, arg] = process.argv

async function run() {
  if (command === 'build') {
    await build()
  } else if (command === 'generate') {
    await generateTemplates(arg)
  } else if (command === 'import') {
    await importTemplates()
  } else {
    console.log('Usage: node cli.js <build|generate [b2c|b2b]|import>')
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
