import { EPizzaSliceStatus } from './pizzaSliceTypes';
export interface IPizzaItemSlice {
  pizza: IPizzaItemSliceBlock;
  status: EPizzaSliceStatus;
}

export interface IPizzaItemSliceBlock {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: number;
  size: number;
  category: number;
  rating: number;
}

export interface IPizzaItemSliceArgs {
  id: string
  currentLanguage: string
}