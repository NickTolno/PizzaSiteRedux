import { IFilterSliceSortType } from "./filterSliceTypes";

export interface IPizzaBlock {
  id: string;
  imageUrl: string;
  title: string;
  type: number;
  size: number;
  price: number;
  category: number;
  rating: number;
};

export interface IPizzasSlice {
  pizzasList: IPizzaBlock[];
  status: EPizzaSliceStatus;
}

export enum EPizzaSliceStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export interface IPizzaSliceParams {
  sortType: IFilterSliceSortType;
  categoryId: number;
  searchValue: string;
  currentPage: number;
  currentLanguage: string;
}