import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import * as sass from 'sass'
import handlebars from 'handlebars'
import juice from 'juice'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function build() {
  const TEMPLATES_DIR = path.join(__dirname, 'src/templates')
  const DIST_DIR = path.join(__dirname, 'dist')
  const SCSS_FILE = path.join(__dirname, 'src/styles/main.scss')
  const HEADER_FILE = path.join(__dirname, 'src/partials/header.hbs')
  const FOOTER_FILE = path.join(__dirname, 'src/partials/footer.hbs')

  // Converte caminho para file:// URL
  const brandDataPath = path.join(__dirname, 'brandData.js')
  const brandDataUrl = pathToFileURL(brandDataPath).href

  // Importa o módulo com URL correta
  const brandDataModule = await import(brandDataUrl)
  const brandData = brandDataModule.default || brandDataModule

  // 1. Compilar SCSS
  const compiledCss = sass.compile(SCSS_FILE).css

  // 2. Ler parciais raw
  const [headerRaw, footerRaw] = await Promise.all([
    fs.readFile(HEADER_FILE, 'utf8'),
    fs.readFile(FOOTER_FILE, 'utf8'),
  ])

  // 3. Compilar parciais com brandData
  const headerHtml = handlebars.compile(headerRaw)(brandData)
  const footerHtml = handlebars.compile(footerRaw)(brandData)

  // 4. Processar templates principais
  const files = await fs.readdir(TEMPLATES_DIR)
  await Promise.all(files.map(async file => {
    if (path.extname(file) !== '.hbs') return

    let templateRaw = await fs.readFile(path.join(TEMPLATES_DIR, file), 'utf8')

    // Substituir parciais compiladas
    templateRaw = templateRaw.replace(/{{\s*header\s*}}/gi, headerHtml)
                             .replace(/{{\s*footer\s*}}/gi, footerHtml)

    // Inline CSS
    const inlinedHtml = juice.inlineContent(templateRaw, compiledCss)

    // Salvar resultado
    const outputFilePath = path.join(DIST_DIR, file.replace(/\.hbs$/, '.html'))
    await fs.writeFile(outputFilePath, inlinedHtml)

    console.log(`✔️ Gerado: ${path.basename(outputFilePath)}`)
  }))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build()
}
