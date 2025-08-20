export default function maskMoneyValue(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^000+/, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
