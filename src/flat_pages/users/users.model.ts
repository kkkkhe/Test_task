import { userModel } from "@/src/entities/user";
import { userApi } from "@/src/shared/api/user";
import { GetUsersDto } from "@/src/shared/api/user/dto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const usersThunk = createAsyncThunk(
  "users/user-thunk",
  async (users: GetUsersDto, { dispatch }) => {
    dispatch(userModel.actions.setUsers(users.results));
    dispatch(userModel.actions.setCount(users.count));
  },
);

export const usersPaginateThunk = createAsyncThunk(
  "users/paginate",
  async (
    { page }: { page: number; offset?: number; limit?: number },
    { dispatch },
  ) => {
    const users = await userApi.usersQuery({ page });
    // dispatch(userModel.actions.setUsers(users.results))
  },
);
