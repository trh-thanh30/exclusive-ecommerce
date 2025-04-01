import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      if (JSON.stringify(state.wishlist) !== JSON.stringify(action.payload)) {
        state.wishlist = action.payload;
      }
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.wishlist.some((item) => item._id === product._id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    },
    removeAllWishlist: (state, action) => {
      state.wishlist = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  removeAllWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
