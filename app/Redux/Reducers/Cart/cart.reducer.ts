import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  quantity: number;
}

interface State {
  items: Array<CartItem>;
}

const initialState: State = {
  items: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state: State, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { updateCart } = CartSlice.actions;

export default CartSlice.reducer;
