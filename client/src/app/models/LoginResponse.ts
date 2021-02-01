import { User } from './User';

export interface LoginResponse {
  success: boolean,
  data: User
}