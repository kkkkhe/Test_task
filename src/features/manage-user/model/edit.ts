import { userModel } from "@/src/entities/user";
import { userApi } from "@/src/shared/api/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
export type EditUserProps = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
export const editUserThunk = createAsyncThunk(
  "feature/manage/update",
  async (
    { id, data }: { id: number; data: EditUserProps },
    { dispatch, getState },
  ) => {
    const editedUser = await userApi.editUserQuery(id, {
      ...data,
      birthday_date: convertDate(data.birthday_date),
    });
    const editableUserId = userModel.selectors.editableUserId(
      getState() as Record<string, any>,
    );
    dispatch(userModel.actions.editUser(editedUser));
    if (editedUser.id && editableUserId) {
      dispatch(userModel.actions.setEditableUserId(null));
    }
  },
);

function convertDate(inputDate: string) {
  const [day, month, year] = inputDate.split("-");
  const currentYear = new Date().getFullYear();
  const century = currentYear - (currentYear % 100);
  const fullYear =
    parseInt(year) < currentYear % 100
      ? century + parseInt(year)
      : century - 100 + parseInt(year);
  const newDate = new Date(fullYear, parseInt(month) - 1, parseInt(day)); // Month is zero-based
  const formattedDate = newDate.toISOString().slice(0, 10);
  return formattedDate;
}
