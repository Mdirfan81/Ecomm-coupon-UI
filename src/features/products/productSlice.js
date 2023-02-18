import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/getAllProducts`);
      "Fetch all product", fetchAllProducts;
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const fetchCardItem = createAsyncThunk(
  "products/fetchCardItem",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/getCard`);
      return response.data;
    } catch (err) {
      err;
    }
  }
);

export const addCardItem = createAsyncThunk(
  "products/addCardItem",
  async (payload) => {
    try {
      const response = await axios.post(`${apiUrl}/products/addItem`, payload);
      return response.data;
    } catch (err) {
      err;
    }
  }
);
export const removeCardItem = createAsyncThunk(
  "products/removeCardItem",
  async (payload) => {
    try {
      const response = await axios.post(
        `${apiUrl}/products/removeItem`,
        payload
      );
      return response.data;
    } catch (err) {
      err;
    }
  }
);

export const removeItems = createAsyncThunk(
  "products/removeItems",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/remove`);
      return response.data;
    } catch (err) {
      err;
    }
  }
);

const initialState = {
  allProducts: {},
  basket: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    add(state, action) {
      "ADD=>", action.payload;
      state.basket.push(action.payload);
    },
    remove(state, action) {
      ("Removing data");
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
      return;
    },
    updateItemQuantity(state, action, quantity) {
      state.basket.map((ele) => {
        if (ele.id === action.payload.id) {
          ele.quantity = quantity;
        }
      });
      // ("Update", state.basket);
    },
    applyCoupon(state, action) {
      "Appling Coupon", action.payload;
      state.basket.map((ele) => {
        if (ele.id === action.payload.id) {
          ele.coupon = action.payload.coupon;
        }
      });
    },
    addQuantity(state, action) {
      "Adding Quantity", action.payload;
      state.basket.map((ele) => {
        if (ele.id === action.payload.id) {
          ele.qty = action.payload;
        }
      });
    },
    emptyBasket(state, action) {
      state.basket = {};
    },
  },
  extraReducers: {
    [fetchAllProducts.fulfilled]: (state, { payload }) => {
      ("Fetch all Products Successfully");
      return { ...state, allProducts: payload.data };
    },
    [fetchCardItem.fulfilled]: (state, { payload }) => {
      ("Fetch all Baskit Successfully");
      return { ...state, basket: payload };
    },
    [addCardItem.fulfilled]: (state, { payload }) => {
      ("Added Item Successfully");
      return { ...state, payload };
    },
    [removeCardItem.fulfilled]: (state, { payload }) => {
      ("Removed Item Successfully");
      return { ...state, payload };
    },
    [removeItems.fulfilled]: (state, { payload }) => {
      ("Empty the Basket Successfully");
      return { ...state, payload };
    },
  },
});

export const { add, remove, updateItemQuantity, applyCoupon, emptyBasket } =
  productSlice.actions; //this for actions
export const getAllProducts = (state) => state.products.allProducts;
export const getCard = (state) => state.products.basket;
export default productSlice.reducer;
