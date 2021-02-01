import { Product } from './Product';

export interface GetProductsResponse {
  success: boolean,
  data: Product[]
}