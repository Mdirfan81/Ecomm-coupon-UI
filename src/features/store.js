import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "./products/productSlice";
export default configureStore({
  reducer: {
    products: productSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
