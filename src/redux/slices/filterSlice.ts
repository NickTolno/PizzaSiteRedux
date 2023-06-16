import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IFilterSlice, IFilterSliceSortType } from '../../@types/filterSliceTypes';

const initialState: IFilterSlice = {
  sortType: { name: 'sort', sort: 'rating' },
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  currentLanguage: Cookies.get('i18next') || 'En',
};

export const filterSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<IFilterSliceSortType>) => {
      state.sortType = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCurrentLanguage(state, action: PayloadAction<string>) {
      state.currentLanguage = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setSortType, setCategoryId, setSearchValue, setCurrentPage, setCurrentLanguage } = filterSlice.actions;
