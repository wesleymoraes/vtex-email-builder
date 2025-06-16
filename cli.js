import { build } from './build.js'
import { generateTemplates } from './createTemplates.js'

const [,, command, arg] = process.argv

async function run() {
  if (command === 'build') {
    await build()
  } else if (command === 'generate') {
    await generateTemplates(arg)
  } else {
    console.log('Usage: node cli.js <build|generate [b2c|b2b]>')
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
