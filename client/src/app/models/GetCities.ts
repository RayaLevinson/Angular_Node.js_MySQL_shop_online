import { City } from './City';

export interface GetCities {
  success: boolean,
  data: City[];
}