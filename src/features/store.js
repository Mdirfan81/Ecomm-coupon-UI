import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import couponSlice from "./coupon/couponSlice";
import couponValidate from "./coupon/couponValidate";
import productSlice from "./products/productSlice";
import userSlice from "./user/userSlice";
import adminSlice from "./admin/adminSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    coupons: couponSlice,
    validCoupons: couponValidate,
    users: userSlice,
    admin: adminSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
