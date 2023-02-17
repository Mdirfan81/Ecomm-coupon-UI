import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const checkout = createAsyncThunk("admin/checkout", async (payload) => {
  try {
    console.log("Getting checkout", payload);
    const response = await axios.post(`${apiUrl}/admin/check`, payload);
    console.log("Triggering the user API", response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const placeOrderDetails = createAsyncThunk(
  "admin/placeOrderDetails",
  async (payload) => {
    try {
      const response = await axios.get(`${apiUrl}/admin/check`);
      console.log("Triggering the user API", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  itemSold: {},
  isLoading: false,
  error: null,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    emptyData(state, action) {
      state.itemSold = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [checkout.pending]: (state, { payload }) => {
      console.log("Checkout  Pending");
      return { ...state, isLoading: true };
    },
    [checkout.fulfilled]: (state, { payload }) => {
      console.log("Checkout  successfully");
      return { ...state, isLoading: false, error: false };
    },
    [checkout.rejected]: (state, { payload }) => {
      console.log("Checkout  Rejected");
      return { ...state, isLoading: false, error: payload };
    },
    //----------------------------------------
    [placeOrderDetails.pending]: (state, { payload }) => {
      console.log("Checkout fetch Pending");
      return { ...state, isLoading: true };
    },
    [placeOrderDetails.fulfilled]: (state, { payload }) => {
      console.log("Checkout fetch successfully");
      return { ...state, isLoading: false, itemSold: payload };
    },
    [placeOrderDetails.rejected]: (state, { payload }) => {
      console.log("Checkout fetch Rejected");
      return { ...state, isLoading: false, error: false };
    },
  },
});

export const { emptyData } = adminSlice.actions;

export const getSoldItemDetails = (state) => state.admin.itemSold;
export const getSoldStatus = (state) => state.admin.isLoading;
export const getSoldError = (state) => state.admin.error;

export default adminSlice.reducer;
