import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { Offer as FullOffer } from '../../types/separated-offers';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Data].nearbyOffers;
export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Data].favoriteOffers;
export const getFavoritesCount = (state: State): number => state[NameSpace.Data].favoritesCount;
export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getActiveOffer = (state: State): FullOffer | null => state[NameSpace.Data].activeOffer;
export const getActiveOfferReviews = (state: State): Reviews => state[NameSpace.Data].activeOfferReviews;
export const getActiveCityName = (state: State): string => state[NameSpace.Data].activeCityName;
export const getOffersByCity = (state: State): Offers => state[NameSpace.Data].offersByCity;
export const getSavedPopularSort = (state: State): Offers => state[NameSpace.Data].savedPopularSort;
