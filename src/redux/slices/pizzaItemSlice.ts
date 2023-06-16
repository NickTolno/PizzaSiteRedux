import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaItemSlice, IPizzaItemSliceArgs, IPizzaItemSliceBlock } from '../../@types/pizzaItemSliceTypes';
import { EPizzaSliceStatus } from '../../@types/pizzaSliceTypes';

const initialState: IPizzaItemSlice = {
  pizza: {} as IPizzaItemSliceBlock,
  status: EPizzaSliceStatus.Loading,
};

export const fetchPizza = createAsyncThunk<IPizzaItemSliceBlock, IPizzaItemSliceArgs>('pizza/fetchPizza', async ({ currentLanguage, id }) => {
  const response = await axios.get<IPizzaItemSliceBlock>(`https://62c007ccd40d6ec55cc99bf2.mockapi.io/Items${currentLanguage}/` + id);
  return response.data as IPizzaItemSliceBlock;
});

export const pizzaItemSlice = createSlice({
  name: 'pizzaItemSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.pizza = {} as IPizzaItemSliceBlock;
      state.status = EPizzaSliceStatus.Loading;
    })
    builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<IPizzaItemSliceBlock>) => {
      state.pizza = action.payload;
      state.status = EPizzaSliceStatus.Success;
    })
    builder.addCase(fetchPizza.rejected, (state) => {
      state.pizza = {} as IPizzaItemSliceBlock;
      state.status = EPizzaSliceStatus.Error;
    })
  },
});

export default pizzaItemSlice.reducer;
