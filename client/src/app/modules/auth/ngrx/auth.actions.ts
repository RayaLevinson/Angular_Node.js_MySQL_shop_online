import { User } from '../../../models/User';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] User login',
  props<{user: User}>()
);

export const register = createAction(
  '[Register Page] User register',
  props<{user: User}>()
);

export const logout = createAction(
  '[Top Menu] Logout'
);