import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "./balanceSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    balance: balanceSlice.reducer,
  },
});

export const actions = { ...userSlice.actions, ...balanceSlice.actions };
