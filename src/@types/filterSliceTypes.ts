export interface IFilterSliceSortType {
  name: string,
  sort: String,
}

export interface IFilterSlice {
  sortType: IFilterSliceSortType;
  categoryId: number;
  searchValue: string;
  currentPage: number;
  currentLanguage: string;
}