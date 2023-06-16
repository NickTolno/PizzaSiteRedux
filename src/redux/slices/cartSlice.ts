import { getCartFromLS } from './../../utils/getCartStateFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, ICartSlice } from '../../@types/cartSliceTypes';

const { items, totalCount, totalPrice } = getCartFromLS();

const initialState: ICartSlice = {
  items,
  totalCount,
  totalPrice,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (!findItem) {
        state.items.push(action.payload);
      } else {
        findItem.count += 1;
      }
      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        state.totalCount -= findItem.count;
        state.totalPrice -= findItem.price * findItem.count;
      }

      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    minusCartItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
        state.totalPrice -= findItem.price;
      }
      state.totalCount -= 1;
    },
    clearCartItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addItemToCart, removeCartItem, minusCartItem, clearCartItems } = cartSlice.actions;
