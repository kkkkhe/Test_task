import { sessionModel } from "@/src/entities/session";
import { sessionApi, sessionErrors } from "@/src/shared/api/authentication";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInThunk = createAsyncThunk(
  "signin-thunk",
  async (
    {
      password,
      username,
    }: {
      password: string;
      username: string;
    },
    { dispatch },
  ) => {
    const response = await sessionApi.signInQuery(username, password);
    if (response.status > 200 && response.status < 300) {
      dispatch(sessionModel.actions.setUser({ username }));
      return;
    }
    dispatch(sessionModel.actions.setError(handleError(response.message)));
  },
);

function handleError(error: string) {
  if (error == sessionErrors.INVALID) {
    return "Password or login is not correct!";
  }
  return sessionErrors.BASE;
}
