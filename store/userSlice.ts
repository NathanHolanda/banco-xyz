import removeFromAsyncStorage from "@/utils/functions/removeFromAsyncStorage";
import setInAsyncStorage from "@/utils/functions/setInAsyncStorage";
import { createSlice } from "@reduxjs/toolkit";

type User = {
  email: string;
  id: string;
  name: string;
  password: string;
};
const initialState = {} as User;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      setInAsyncStorage("user", action.payload);

      return {
        ...action.payload,
      };
    },
    removeUser: (state) => {
      removeFromAsyncStorage("user");

      return null as any;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
