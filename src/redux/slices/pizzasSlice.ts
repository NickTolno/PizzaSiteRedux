import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EPizzaSliceStatus, IPizzaBlock, IPizzaSliceParams, IPizzasSlice } from '../../@types/pizzaSliceTypes';

const initialState: IPizzasSlice = {
  pizzasList: [],
  status: EPizzaSliceStatus.Loading,
};

export const fetchPizzas = createAsyncThunk<IPizzaBlock[], IPizzaSliceParams>('pizzas/fetchPizzas', async (params) => {
  const { sortType, categoryId, searchValue, currentPage, currentLanguage } = params;
  const response = await axios.get<IPizzaBlock[]>(`https://62c007ccd40d6ec55cc99bf2.mockapi.io/Items${currentLanguage}`, {
    params: {
      page: currentPage,
      limit: 4,
      sortBy: sortType.sort,
      category: categoryId > 0 ? categoryId : null,
      search: searchValue,
    },
  });
  return response.data;
});

export const pizzasSlice = createSlice({
  name: 'pizzasSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzasList = [];
      state.status = EPizzaSliceStatus.Loading;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzasList = action.payload;
      state.status = EPizzaSliceStatus.Success;
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzasList = [];
      state.status = EPizzaSliceStatus.Error;
    })
  },
});

export default pizzasSlice.reducer;
