import { store } from '../store/index';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
}

export type Main = {
  favoritesCount: number;
  favoriteOffers: Offers;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
};

export type Data = {
  favoritesCount: number;
  favoriteOffers: Offers;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
};
