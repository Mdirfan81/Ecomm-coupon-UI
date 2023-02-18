import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const fetchAllCoupons = createAsyncThunk(
  "coupons/fetchAllCoupons",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/coupons`);
      // ("Fetch all Coupons", response.data.coupons[0]);
      return response.data.coupons[0];
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  allCoupons: {},
  isLoading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllCoupons.pending]: (state, { payload }) => {
      ("Fetch all Coupons is Pending");
      return { ...state, isLoading: true };
    },
    [fetchAllCoupons.fulfilled]: (state, { payload }) => {
      "Fetch all Coupons Successfully", payload;
      return { ...state, allCoupons: payload };
    },
    [fetchAllCoupons.rejected]: (state, { payload }) => {
      ("Got Error in Coupons");
      return { ...state, error: true };
    },
  },
});

export const getAllCoupons = (state) => state.coupons.allCoupons;
export const getCouponsStatus = (state) => state.coupons.isLoading;
export const getCouponError = (state) => state.coupons.error;

export default couponSlice.reducer;
