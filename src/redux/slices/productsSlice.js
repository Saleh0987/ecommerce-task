import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    allItems: [],
    categories: [],
    status: "idle",
    error: null,
    currentPage: 1,
    limit: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      const start = (state.currentPage - 1) * state.limit;
      const end = start + state.limit;
      state.items = state.allItems.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allItems = action.payload;
        const start = (state.currentPage - 1) * state.limit;
        const end = start + state.limit;
        state.items = state.allItems.slice(start, end);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {setPage} = productsSlice.actions;
export default productsSlice.reducer;
