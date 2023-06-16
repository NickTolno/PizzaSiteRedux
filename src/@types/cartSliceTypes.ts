export interface ICartItem {
  id: string;
  title: string;
  type: string;
  size: number;
  imageUrl: string;
  price: number;
  count: number;
};

export interface ICartSlice {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
}