export function validateInput(input: string, pattern: RegExp): boolean {
  const regex = new RegExp(pattern);
  return regex.test(input);
}