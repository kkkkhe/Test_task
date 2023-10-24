export const checkValidation = ({
  value,
  pattern,
  max,
  min,
  required = true,
}: {
  value: string;
  pattern?: RegExp;
  max?: number;
  min?: number;
  required?: boolean;
}) => {
  if (required && (!value || value.trim() === "")) {
    return "Field is required.";
  }
  if (pattern && !pattern.test(value)) {
    return "Invalid value.";
  }
  if (min && value.length < min) {
    return `Value is too short. Minimum length is ${min}.`;
  }
  if (max && value.length > max) {
    return `Value is too long. Maximum length is ${max}.`;
  }
};
