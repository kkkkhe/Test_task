import { User, userModel } from "@/src/entities/user";
import { userApi } from "@/src/shared/api/user";
import { convertDate } from "@/src/shared/lib/convert-date";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateInputsThunk } from "./core";
export const editUserThunk = createAsyncThunk(
  "feature/manage/edit",
  async (
    { id, data }: { id: number; data: Omit<User, "id"> },
    { dispatch, getState },
  ) => {
    try {
      const isAnyError = await dispatch(validateInputsThunk(data))
      if(isAnyError.payload) return
      // const editedUser = await userApi.editUserQuery(id, {
      //   ...data,
      //   birthday_date: convertDate(data.birthday_date),
      // });
      // const editableUserId = userModel.selectors.editableUserId(
      //   getState() as Record<string, any>,
      // );
      // dispatch(userModel.actions.editUser(editedUser));
      // if (editedUser.id && editableUserId) {
      //   dispatch(userModel.actions.setEditableUserId(null));
      // }
      
    } catch (error) {
      console.log(error)
    }
  },
);
