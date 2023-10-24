import { userModel } from "@/src/entities/user";
import { UserId, userApi } from "@/src/shared/api/user";
import { getCurrentPage } from "@/src/shared/lib/get-current-page";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteUserThunk = createAsyncThunk(
  "feature/manage/delete",
  async (
    id: UserId,
    { dispatch },
  ) => {
    try {
      await userApi.deleteUserQuery(id);
      const currentPage = getCurrentPage()
      const refetch = await userApi.usersQuery({page: currentPage})
      dispatch(userModel.actions.setUsers(refetch.results))
    } catch (error) {
      console.log(error) 
    }
  },
);