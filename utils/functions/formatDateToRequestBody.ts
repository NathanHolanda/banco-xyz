export default function formatDateToRequestBody(date: Date) {
  return date.toLocaleDateString().split("/").reverse().join("-");
}
