import { createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/axios";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    name: "",
    email: "",
    avatar_url: "",
    loggedIn: false,
    welcome: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.loggedIn = true;
      state._id = action.payload._id;
      return state;
    },
    logout: async (state) => {
      const result = await request("get", "/user/logout");
      console.log(result);
      state.name = "";
      state.email = "";
      state.avatar_url = "";
      state._id = "";
      state.loggedIn = false;
      window.location.reload();

      return state;
    },
    welcomeMessage: (state) => {
      state.welcome = false;
    },
  },
});

export const { setUser, logout, welcomeMessage } = sessionSlice.actions;

export default sessionSlice.reducer;
