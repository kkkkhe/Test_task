import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { sessionModel } from "../entities/session";
import { userModel } from "../entities/user";

const rootReducer = combineReducers({
  ...sessionModel.reducer,
  ...userModel.reducer,
});

const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
let store: any;
export const initializeStore = (preloadedState: any) => {
  let _store = store ?? createStore(preloadedState);

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
