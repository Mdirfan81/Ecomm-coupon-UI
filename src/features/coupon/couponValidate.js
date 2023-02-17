import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const checkCoupon = createAsyncThunk(
  "validCoupons/checkCoupon",
  async (payload) => {
    try {
      console.log({ payload });
      const response = await axios.get(
        // `${apiUrl}/products/validCoupon/CVHYJDSA`
        `${apiUrl}/products/validCoupon/${payload}`
      );
      // console.log("Checking for coupon", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  isValid: null,
  isLoading: false,
  error: null,
};

const couponValidSlice = createSlice({
  name: "validCoupons",
  initialState,
  reducers: {
    removeAllState(state, action) {
      state.isValid = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [checkCoupon.pending]: (state, { payload }) => {
      console.log("Valid Coupon Pending");
      return { ...state, isLoading: true };
    },
    [checkCoupon.fulfilled]: (state, { payload }) => {
      console.log("Valid Coupon Successfully");
      return { ...state, isValid: payload, isLoading: false };
    },
    [checkCoupon.rejected]: (state) => {
      console.log("Valid Coupon Rejected");
      return { ...state, error: true, isLoading: false };
    },
  },
});

export const { removeAllState } = couponValidSlice.actions;

export const getValidateCoupon = (state) => state.validCoupons.isValid;
export const getValidateCouponStatus = (state) => state.validCoupons.isLoading;
export const getValidateCouponError = (state) => state.validCoupons.error;

export default couponValidSlice.reducer;
