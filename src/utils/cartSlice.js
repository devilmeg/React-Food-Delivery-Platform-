import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      //mutating the state here
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;//[];
      //return {items:[]};// also works this new object will replace the  original state
    },
  },
});

// Export actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// ✅ Correct export: cartSlice.reducer (NOT createSlice.reducer)
export default cartSlice.reducer;
