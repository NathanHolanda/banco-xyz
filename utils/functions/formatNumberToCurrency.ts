export default function formatNumberToCurrency(
  number: number,
  currency: string = "BRL"
): string {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(number);
}
