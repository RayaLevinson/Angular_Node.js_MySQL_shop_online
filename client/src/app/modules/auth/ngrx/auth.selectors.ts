import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = 
  createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => !!auth.user     // produce boolean
);

export const userFirstName = createSelector(
  selectAuthState,
  auth => auth.user ? auth.user.firstName : ''
);

export const isUserLoggedIn = createSelector(
  selectAuthState,
  auth => (auth.user && (auth.user.role === 'user'))    // produce boolean
);

export const isAdminLoggedIn = createSelector(
  selectAuthState,
  auth => (auth.user && (auth.user.role === 'admin'))    // produce boolean
);

export const currUser = createSelector(
  selectAuthState,
  auth => auth.user
);
