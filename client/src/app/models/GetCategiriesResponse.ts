import { Category } from './Category';

export interface GetCategoriesResponse {
  success: boolean,
  data: Category[]
}