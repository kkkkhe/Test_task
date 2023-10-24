import { validateInput } from "@/src/shared/lib/validate-input";
import { INVALID_PHONE, INVALID_EMAIL, INVALID_DATE } from "./config";

export const checkError = ({
  phone,
  email,
  date,
}: {
  phone: string;
  email: string;
  date: string;
}) => {
  const isNumberValid = validateInput(
    phone,
    /^(?:\+380|380)\d{9}$/,
  );
  const isEmailValid = validateInput(
    email,
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  );
  const isDateValid = validateInput(
    date,
    /^(?:(?:0[1-9]|1[0-9]|2[0-9]|3[0-1])-(0[1-9]|1[0-2])-(\d{2}|\d{4})|\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))$/,
  );
  let errors = {
    invalidPhoneMessage: "",
    invalidEmailMessage: "",
    invalidDateMessage: "",
    isInvalid: false,
  };
  if (!isNumberValid) {
    errors = { ...errors, invalidPhoneMessage: INVALID_PHONE, isInvalid: true };
  }
  if (!isEmailValid) {
    errors = { ...errors, invalidEmailMessage: INVALID_EMAIL, isInvalid: true };
  }
  if (!isDateValid) {
    errors = { ...errors, invalidDateMessage: INVALID_DATE, isInvalid: true };
  }
  return {
    errors,
  };
};
