# VTEX Transactional Email Builder

Este projeto permite compilar templates de e-mail transacionais da VTEX usando
Handlebars, SCSS (SASS) e inlining com Juice.\
O objetivo é centralizar variáveis de estilo, reaproveitar header/footer e gerar
HTML final pronto para ser inserido no admin da VTEX.

---

## 📁 Estrutura de pastas

```plaintext
vtex-email-builder/
├── src/
│   ├── partials/            # Header e footer
│   │   ├── header.hbs
│   │   └── footer.hbs
│   ├── styles/
│   │   ├── _variables.scss  # Cores, fontes, espaçamentos
│   │   └── main.scss        # Estilo base do e-mail
│   └── templates/           # Templates de e-mails (.hbs)
│       └── order-confirmation.hbs
├── dist/                    # HTML final gerado com CSS inline
├── build.js                 # Script que compila os e-mails
├── create-templates.sh      # Cria automaticamente os templates B2C ou B2B
├── package.json
└── README.md
```

---

## ⚙️ Dependências

Instale os pacotes necessários:

```bash
npm install
```

> As principais libs são:
>
> - `handlebars` – templates reutilizáveis
> - `juice` – converte CSS para inline (requisito da VTEX)
> - `sass` – compila SCSS para CSS
> - `fs-extra`, `path`, `glob` – para manipulação de arquivos

---

## 🚀 Como usar

### 1. Criar os templates de e-mail

Execute o script com o parâmetro para o tipo de template:

- Para templates B2C:

```bash
./create-templates.sh b2c
```

- Para templates B2B:

```bash
./create-templates.sh b2b
```

O script cria os arquivos `.hbs` base em `src/templates/`, sem sobrescrever
arquivos existentes.

---

### 2. Compilar os e-mails

```bash
node build.js
```

Este comando:

- Compila o SCSS (`src/styles/main.scss`)
- Aplica o CSS como inline nos e-mails
- Injeta o header e footer já compilados com os dados do `brandData.js`
- Gera os arquivos finais em `dist/*.html`
- Mantém intactos os placeholders VTEX dentro dos templates principais (`{{}}`)

### 3. Compilar pelo GitHub

Também é possível gerar os HTMLs usando o GitHub Actions. Acesse a aba **Actions** do repositório e execute o workflow *Build Email Templates*. Ao fim da execução os arquivos da pasta `dist/` ficam disponíveis como artefato para download.

---

## ✏️ Customização

### Dados da Marca

O arquivo `brandData.js` exporta as variáveis usadas para compilar os parciais
header e footer, por exemplo:

```js
export default {
    brandName: "friopecas",
    brandLogo: "https://exemplo.com/logo.png",
    contactEmail: "contato@sualoja.com",
    cnpj: "09.316.105/0001-29",
    facebookUrl: "https://facebook.com/sualoja",
    instagramUrl: "https://instagram.com/sualoja",
    linkedinUrl: "https://linkedin.com/company/sualoja",
    twitterUrl: "https://twitter.com/sualoja",
    currentYear: new Date().getFullYear(),
    copyrightText:
        `Razão Social: friopecas Ltda CNPJ: 09.316.105/0001-29. Todos os direitos reservados © ${
            new Date().getFullYear()
        }. Preços e condições exclusivos para friopecas.com.br`,
};
```

### Estilização

Edite o arquivo:

```scss
// src/styles/_variables.scss

$primary-color: #005eff;
$text-color: #333;
$font-family: Arial, sans-serif;
```

### Header/Footer

Edite os arquivos:

```hbs
// src/partials/header.hbs
// src/partials/footer.hbs
```

---

## 📬 Placeholders VTEX

- {{clientName}} — Nome do cliente

- {{clientEmail}} — E-mail do cliente

- {{orderId}} — Número do pedido

- {{orderDate}} — Data do pedido

- {{orderStatus}} — Status do pedido

- {{trackingUrl}} — URL para rastreamento

- {{shippingAddress}} — Endereço de entrega

- {{billingAddress}} — Endereço de cobrança

- {{paymentMethod}} — Método de pagamento

- {{items}} — Lista dos itens do pedido (loop)

- {{itemName}} — Nome do item (usado dentro de {{items}})

- {{itemQuantity}} — Quantidade do item (dentro de {{items}})

- {{itemPrice}} — Preço unitário do item (dentro de {{items}})

- {{totalValue}} — Valor total do pedido

- {{subtotal}} — Subtotal do pedido

- {{shippingCost}} — Custo de frete

- {{discount}} — Valor do desconto aplicado

- {{invoiceUrl}} — Link para a nota fiscal (quando disponível)

- {{paymentStatus}} — Status do pagamento

- {{orderUrl}} — Link para a página do pedido

- {{deliveryDate}} — Data prevista de entrega

- {{customerDocument}} — CPF ou CNPJ do cliente

- {{sellerName}} — Nome do vendedor (em pedidos B2B)

- {{storeName}} — Nome da loja

### Placeholders adicionais (variam conforme template e configuração VTEX)

- {{voucherCode}} — Código do voucher (em promoções)

- {{giftCardValue}} — Valor do gift card

- {{returnUrl}} — URL para processo de devolução

- {{customerPhone}} — Telefone do cliente

- {{orderComments}} — Comentários do pedido

- {{shippingMethod}} — Método de entrega selecionado

Estes valores são substituídos automaticamente pela VTEX no envio do e-mail.

---

## 📚 Templates incluídos

### B2C

```plaintext
order-confirmation.hbs
order-invoiced.hbs
order-cancelled.hbs
payment-approved.hbs
payment-denied.hbs
order-shipping.hbs
order-delivered.hbs
cart-abandonment.hbs
customer-registration.hbs
password-reset.hbs
order-ready-for-pickup.hbs
invoice-available.hbs
exchange-requested.hbs
return-requested.hbs
subscription-renewed.hbs
gift-card-issued.hbs
ticket-created.hbs
order-on-hold.hbs
```

### B2B

```plaintext
b2b-order-confirmation.hbs
b2b-order-approval-request.hbs
b2b-order-approved.hbs
b2b-order-rejected.hbs
b2b-invoice-available.hbs
b2b-order-cancelled.hbs
b2b-payment-approved.hbs
b2b-payment-denied.hbs
b2b-delivery-scheduled.hbs
b2b-delivery-completed.hbs
```

---

## 📄 Licença

Uso interno. Sem licença pública definida.
# vtex-email-builder
