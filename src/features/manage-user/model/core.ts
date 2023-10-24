import { User } from "@/src/entities/user";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { checkValidation } from "../lib";
import { PHONE_REGEXP, EMAIL_REGEXP, BIRTHDATE_REGEXP } from "../config";

const initialState = {
  nameError: "",
  addressError: "",
  phoneError: "",
  emailError: "",
  birthdayDateError: "",
};
const name = "feature/manage-user";
type State = typeof initialState;
export const manageUserSlice = createSlice({
  name,
  initialState,
  reducers: {
    setNameError(state, error: PayloadAction<string>) {
      state.nameError = error.payload;
    },
    setAddressError(state, error: PayloadAction<string>) {
      state.addressError = error.payload;
    },
    setPhoneError(state, error: PayloadAction<string>) {
      state.phoneError = error.payload;
    },
    setEmailError(state, error: PayloadAction<string>) {
      state.emailError = error.payload;
    },
    setBirthdayError(state, error: PayloadAction<string>) {
      state.birthdayDateError = error.payload;
    },
    resetErrors(state) {
      state.nameError = "";
      state.addressError = "";
      state.phoneError = "";
      state.emailError = "";
      state.birthdayDateError = "";
    },
  },
});

export const validateInputsThunk = createAsyncThunk(
  "feature/manage-user/validate",
  (data: Omit<User, "id">, { dispatch }) => {
    const { name, email, birthday_date, phone_number, address } = data;
    const addressError = checkValidation({
      value: address,
      required: false,
      max: 200,
    });
    const phoneError = checkValidation({
      value: phone_number,
      pattern: PHONE_REGEXP,
      max: 20,
      min: 1,
    });
    const emailError = checkValidation({
      value: email,
      pattern: EMAIL_REGEXP,
      max: 254,
      min: 1,
    });
    const nameError = checkValidation({
      value: name,
      max: 254,
      min: 1,
    });
    const birthdayDateError = checkValidation({
      value: birthday_date,
      pattern: BIRTHDATE_REGEXP,
      max: 254,
      min: 1,
    });
    if (nameError) {
      dispatch(actions.setNameError(nameError));
    }
    if (addressError) {
      dispatch(actions.setAddressError(addressError));
    }
    if (phoneError) {
      dispatch(actions.setPhoneError(phoneError));
    }
    if (emailError) {
      dispatch(actions.setEmailError(emailError));
    }
    if (birthdayDateError) {
      dispatch(actions.setBirthdayError(birthdayDateError));
    }
    if (addressError || phoneError || emailError || birthdayDateError) {
      return true;
    }
    return false;
  },
);

export const actions = {
  ...manageUserSlice.actions,
};

const addressError = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].addressError,
);
const nameError = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].nameError,
);
const phoneError = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].phoneError,
);
const emailError = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].emailError,
);
const dateError = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].birthdayDateError,
);

export const selectors = {
  addressError,
  nameError,
  phoneError,
  emailError,
  dateError,
};
export const reducer = { [name]: manageUserSlice.reducer };
