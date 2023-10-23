export function validate({
  str,
  max,
  min,
  label,
}: {
  str: string;
  max: number;
  min: number;
  label: string;
}) {
  if (str.length > max) {
    return `${label} is too long!`;
  }
  if (str.length < min) {
    return `${label} is too short!`;
  }
  return "";
}