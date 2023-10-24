export function convertDate(inputDate: string) {
  const [day, month, year] = inputDate.split("-");
  const currentYear = new Date().getFullYear();
  const century = currentYear - (currentYear % 100);
  const fullYear =
    parseInt(year) < currentYear % 100
      ? century + parseInt(year)
      : century - 100 + parseInt(year);
  const newDate = new Date(fullYear, parseInt(month) - 1, parseInt(day)); // Month is zero-based
  const formattedDate = newDate.toISOString().slice(0, 10);
  return formattedDate;
}
