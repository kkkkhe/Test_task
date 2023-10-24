import { userModel } from "@/src/entities/user";
import { userApi } from "@/src/shared/api/user";
import { convertDate } from "@/src/shared/lib/convert-date";
import { getCurrentPage } from "@/src/shared/lib/get-current-page";
import { createAsyncThunk } from "@reduxjs/toolkit";
type EditUserProps = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
export const createUserThunk = createAsyncThunk(
  "feature/manage/create",
  async (data: EditUserProps, { dispatch, getState }) => {
    try {
      const editableUserId = userModel.selectors.isUserCreatingModalOpened(
        getState() as Record<string, any>,
      );

      const createdUser = await userApi.createUserQuery({
        ...data,
        birthday_date: convertDate(data.birthday_date),
      });

      if (createdUser.id && editableUserId) {
        dispatch(userModel.actions.setUserCreatingState(false));
      }
      const currentPage = getCurrentPage();
      const refetch = await userApi.usersQuery({ page: currentPage });
      dispatch(userModel.actions.setUsers(refetch.results));
    } catch (error) {
      console.log(error);
    }
  },
);
