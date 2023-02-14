import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/getAllProducts`);
      console.log("Fetch all product", fetchAllProducts);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
      console.log("ADD=>", action.payload);
      state.basket.push(action.payload);
    },
    remove(state, action) {
      console.log("Removing data");
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
      return;
    },
  },
  extraReducers: {
    [fetchAllProducts.fulfilled]: (state, { payload }) => {
      console.log("Fetch all Products Successfully");
      return { ...state, allProducts: payload.data };
    },
    [fetchCardItem.fulfilled]: (state, { payload }) => {
      console.log("Fetch all Baskit Successfully");
      return { ...state, basket: payload };
    },
    [addCardItem.fulfilled]: (state, { payload }) => {
      console.log("Added Item Successfully");
      return { ...state, payload };
    },
    [removeCardItem.fulfilled]: (state, { payload }) => {
      console.log("Removed Item Successfully");
      return { ...state, payload };
    },
  },
});

export const { add, remove } = productSlice.actions; //this for actions
export const getAllProducts = (state) => state.products.allProducts;
export const getCard = (state) => state.products.basket;
export default productSlice.reducer;
