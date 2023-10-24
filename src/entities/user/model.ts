import { UserId } from "@/src/shared/api/user";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";
const initialState = {
  users: [] as User[],
  count: 0,
  next: "",
  previous: "",
  editableUser: null as null | UserId,
  isUserCreating: false,
};
type State = typeof initialState;
const name = "entities/users";
const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUsers(state, creds: PayloadAction<User[]>) {
      const users = creds.payload;
      state.users = users;
    },
    removeUser(state) {
      state.users = [];
    },
    setCount(state, count: PayloadAction<number>) {
      state.count = count.payload;
    },
    editUser(state, editedUser: PayloadAction<User>) {
      const user = editedUser.payload;
      state.users = state.users.map((u) => (user.id === u.id ? user : u));
    },
    setEditableUser(state, userId: PayloadAction<null | UserId>) {
      state.editableUser = userId.payload;
    },
    setUserCreatingState(state, userId: PayloadAction<boolean>) {
      state.isUserCreating = userId.payload;
    },
    insertUser(state, user: PayloadAction<User>) {
      state.users = [user.payload, ...state.users];
    }
  },
});

const users = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].users,
);
const count = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].count,
);
const editableUserId = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].editableUser,
);
const isUserCreatingModalOpened = createSelector(
  (state: Record<typeof name, State>) => state,
  (state) => state[name].isUserCreating,
);

export const selectors = {
  users,
  count,
  editableUserId,
  isUserCreatingModalOpened
};

export const actions = {
  setUsers: usersSlice.actions.setUsers,
  removeUser: usersSlice.actions.removeUser,
  setCount: usersSlice.actions.setCount,
  editUser: usersSlice.actions.editUser,
  setEditableUserId: usersSlice.actions.setEditableUser,
  setUserCreatingState: usersSlice.actions.setUserCreatingState,
  insertUser: usersSlice.actions.insertUser
};

export const reducer = { [usersSlice.name]: usersSlice.reducer };
