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
    try {
      const response = await sessionApi.signInQuery(username, password);
      dispatch(sessionModel.actions.setUser({ username }));
      return response
    } catch (error: any) {
      dispatch(sessionModel.actions.setError(handleError(error.message)));
    }
  },
);

function handleError(error: string) {
  if (error == sessionErrors.INVALID) {
    return "Password or login is not correct!";
  }
  return sessionErrors.BASE;
}
