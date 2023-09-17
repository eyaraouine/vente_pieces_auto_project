import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "token",
  initialState: {
    value: localStorage.getItem("token"),
  },
  reducers: {
    setToken: (state: any, action: any) => {
      state.value = action.payload;
    },
  },
});

const updateData = createSlice({
  name: "update",
  initialState: {
    value: false,
  },
  reducers: {
    update: (state: any) => {
        state.value = !state.value;
    },
  },
});

export const { setToken } = slice.actions;
export const { update } = updateData.actions;

export default configureStore({
  reducer: {
    token: slice.reducer,
    update: updateData.reducer,
  },
});
