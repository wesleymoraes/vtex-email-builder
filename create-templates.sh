#!/bin/bash

mkdir -p src/templates

TEMPLATES_B2C=(
  "order-confirmation"
  "order-invoiced"
  "order-cancelled"
  "payment-approved"
  "payment-denied"
  "order-shipping"
  "order-delivered"
  "cart-abandonment"
  "customer-registration"
  "password-reset"
  "order-ready-for-pickup"
  "invoice-available"
  "exchange-requested"
  "return-requested"
  "subscription-renewed"
  "gift-card-issued"
  "ticket-created"
  "order-on-hold"
)

TEMPLATES_B2B=(
  "b2b-order-confirmation"
  "b2b-order-approval-request"
  "b2b-order-approved"
  "b2b-order-rejected"
  "b2b-invoice-available"
  "b2b-order-cancelled"
  "b2b-payment-approved"
  "b2b-payment-denied"
  "b2b-delivery-scheduled"
  "b2b-delivery-completed"
)

if [ "$1" == "b2c" ]; then
  TEMPLATES=("${TEMPLATES_B2C[@]}")
elif [ "$1" == "b2b" ]; then
  TEMPLATES=("${TEMPLATES_B2B[@]}")
else
  echo "Uso: $0 [b2c|b2b]"
  exit 1
fi

for name in "${TEMPLATES[@]}"; do
  FILE="src/templates/$name.hbs"
  if [ ! -f "$FILE" ]; then
    cat <<EOF > "$FILE"
{{> header}}

<!-- Conteúdo do e-mail $name -->
<p>Olá, {{clientName}}!</p>

{{> footer}}
EOF
    echo "✔️ Criado: $FILE"
  else
    echo "⚠️ Já existe: $FILE"
  fi
done
