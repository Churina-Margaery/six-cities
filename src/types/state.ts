import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Offer as FullOffer } from '../types/separated-offers';
import { Offers } from '../types/offers';
import { SortTypes } from '../const';
import { Reviews } from '../types/reviews';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
}

export type MainState = {
  activeCityName: string;
  activeSort: SortTypes;
  offersByCity: Offers; //!
  savedPopularSort: Offers;
}

export type DataState = {
  offers: Offers;
  nearbyOffers: Offers;
  favoriteOffers: Offers;
  favoritesCount: number; //!!
  isOffersDataLoading: boolean;
  activeOffer: FullOffer | null;
  activeOfferReviews: Reviews;
  error: string | null;
}
