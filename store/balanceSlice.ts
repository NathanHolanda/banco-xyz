import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: 0,
  reducers: {
    setBalance: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice;
