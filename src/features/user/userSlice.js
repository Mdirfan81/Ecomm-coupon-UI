import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const authUser = createAsyncThunk("users/authUser", async (payload) => {
  try {
    // setTimeout(async () => {
    const response = await axios.post(`${apiUrl}/user/auth`, payload);
    console.log("Triggering the user API", response);
    // console.log(response);
    return response.data;
    // }, 2000);
  } catch (err) {
    console.error(err);
  }
});

const initialState = {
  userData: {},
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeLocalUser(state, action) {
      state.userData = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [authUser.pending]: (state, { payload }) => {
      console.log("Auth user Pending");
      return { ...state, isLoading: true };
    },
    [authUser.fulfilled]: (state, { payload }) => {
      console.log("Auth user successfully");
      return { ...state, isLoading: false, userData: payload };
    },
    [authUser.rejected]: (state, { payload }) => {
      console.log("Auth user Rejected");
      return { ...state, isLoading: false, error: payload };
    },
  },
});

export const { removeLocalUser } = userSlice.actions;

export const getUser = (state) => state.users.userData;
export const getUserStatus = (state) => state.users.isLoading;
export const getUserError = (state) => state.users.error;

export default userSlice.reducer;
