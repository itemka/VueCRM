export default function currencyFilter(value, currency = 'USD') {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency
  }).format(value)
}
