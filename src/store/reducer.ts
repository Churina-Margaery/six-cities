import { createReducer } from '@reduxjs/toolkit';
import { changeCity, favoriteOfferChange, sortTypeChange, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus } from './action';
import { AuthorizationStatus } from '../const';
import { Offers, Offer } from '../types/offers';


function priceDown(offerA: Offer, offerB: Offer) {
  return offerA.price - offerB.price;
}

function priceUp(offerA: Offer, offerB: Offer) {
  return offerB.price - offerA.price;
}

function ratingUp(offerA: Offer, offerB: Offer) {
  return offerB.rating - offerA.rating;
}

function selectOffers(offers: Offers, cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}

function countFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite).length;
}

function toggleFavoriteCard(offers: Offers, id: string) {
  return offers.map((offer) => offer.id === id ? { ...offer, isFavorite: !offer.isFavorite } : offer);
}

function getFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite);
}

function sortChange(offers: Offers, type: string, popularOffers: Offers) {
  switch (type) {
    case 'Price: low to high':
      return offers.sort(priceDown);
    case 'Price: high to low':
      return offers.sort(priceUp);
    case 'Top rated first':
      return offers.sort(ratingUp);
    case 'Popular':
      return popularOffers;
  }

  return offers;
}

type InitialState = {
  activeCityName: string;
  offersByCity: Offers;
  favoritesCount: number;
  offers: Offers;
  nearbyOffers: Offers;
  favoriteOffers: Offers;
  activeSort: string;
  savedPopularSort: Offers;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  activeCityName: 'Paris',
  offersByCity: selectOffers([], 'Paris'),
  favoritesCount: countFavorites([]),
  offers: [],
  nearbyOffers: [],
  favoriteOffers: getFavorites([]),
  activeSort: 'Popular',
  savedPopularSort: selectOffers([], 'Paris'),
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCityName = action.payload;
      state.offersByCity = selectOffers(state.offers, action.payload);
      state.savedPopularSort = selectOffers([], action.payload);
      state.activeSort = 'Popular';
    })
    .addCase(favoriteOfferChange, (state, action) => {
      state.offers = toggleFavoriteCard(state.offers, action.payload.id);
      state.offersByCity = toggleFavoriteCard(state.offersByCity, action.payload.id);
      state.nearbyOffers = toggleFavoriteCard(state.nearbyOffers, action.payload.id);
      state.favoritesCount = countFavorites(state.offers);
      state.favoriteOffers = getFavorites(state.offers);
      state.savedPopularSort = toggleFavoriteCard(state.savedPopularSort, action.payload.id);
    })
    .addCase(sortTypeChange, (state, action) => {
      state.offersByCity = sortChange(state.offersByCity, action.payload, state.savedPopularSort);
      state.activeSort = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
