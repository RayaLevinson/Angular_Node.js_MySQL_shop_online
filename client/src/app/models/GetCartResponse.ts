import { CartItem } from './CartItem';

export interface GetCartResponse {
  success: boolean,
  data: CartItem[]
}