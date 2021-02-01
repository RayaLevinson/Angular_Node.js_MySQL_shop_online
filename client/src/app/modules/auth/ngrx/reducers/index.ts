import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: null
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state: AuthState, action): AuthState => {
    return {
      ...state,
      user: action.user
    }
  }),
  
  on(AuthActions.register, (state: AuthState, action): AuthState => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(AuthActions.logout, (state: AuthState, action): AuthState => {
    return {
      ...state,
      user: null
    }
  })
);