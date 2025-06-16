import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEMPLATES_B2C = [
  'order-confirmation',
  'order-invoiced',
  'order-cancelled',
  'payment-approved',
  'payment-denied',
  'order-shipping',
  'order-delivered',
  'cart-abandonment',
  'customer-registration',
  'password-reset',
  'order-ready-for-pickup',
  'invoice-available',
  'exchange-requested',
  'return-requested',
  'subscription-renewed',
  'gift-card-issued',
  'ticket-created',
  'order-on-hold'
]

const TEMPLATES_B2B = [
  'b2b-order-confirmation',
  'b2b-order-approval-request',
  'b2b-order-approved',
  'b2b-order-rejected',
  'b2b-invoice-available',
  'b2b-order-cancelled',
  'b2b-payment-approved',
  'b2b-payment-denied',
  'b2b-delivery-scheduled',
  'b2b-delivery-completed'
]

export async function generateTemplates(type) {
  let templates
  if (type === 'b2c') {
    templates = TEMPLATES_B2C
  } else if (type === 'b2b') {
    templates = TEMPLATES_B2B
  } else {
    console.error('Uso: node createTemplates.js [b2c|b2b]')
    return
  }

  const templatesDir = path.join(__dirname, 'src', 'templates')
  await fs.mkdir(templatesDir, { recursive: true })

  for (const name of templates) {
    const file = path.join(templatesDir, `${name}.hbs`)
    try {
      await fs.access(file)
      console.log(`⚠️ Já existe: ${file}`)
      continue
    } catch {}

    const content = `{{> header}}

<!-- Conteúdo do e-mail ${name} -->
<p>Olá, {{clientName}}!</p>

{{> footer}}
`
    await fs.writeFile(file, content)
    console.log(`✔️ Criado: ${file}`)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateTemplates(process.argv[2])
}

