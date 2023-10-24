export const checkValidation = ({
  value,
  pattern,
  max,
  min,
  required = true,
}: {
  value: string,
  pattern?: RegExp,
  max?: number,
  min?: number,
  required?: boolean,
}) => {

  if (required && (!value || value.trim() === '')) {
    return 'Value is required.';
  }
  if (pattern && !pattern.test(value)) {
    return 'Value does not match the provided pattern.';
  }
  if (min !== undefined && value.length < min) {
    return `Value is too short. Minimum length is ${min}.`;
  }
  if (max !== undefined && value.length > max) {
    return `Value is too long. Maximum length is ${max}.`;
  }
}