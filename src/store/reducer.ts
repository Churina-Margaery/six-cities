import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity, favoriteOfferChange, sortTypeChange, loadOffers,
  requireAuthorization, setError, setOffersDataLoadingStatus, fetchOfferData, fetchNearbyOffersData,
  fetchOfferCommentsData, setEmail, logIn, logOut
} from './action';
import { AuthorizationStatus } from '../const';
import { Offers, Offer } from '../types/offers';
import { Reviews } from '../types/reviews';
import { Offer as FullOffer } from '../types/separated-offers';

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

function cleanFavorites(offers: Offers) {
  return offers.map((item) => ({
    ...item,
    isFavorite: false
  }));
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
  activeOffer: FullOffer | null;
  activeOfferReviews: Reviews;
  userEmail: string;
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
  activeOffer: null,
  activeOfferReviews: [],
  userEmail: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCityName = action.payload;
      state.offersByCity = selectOffers(state.offers, action.payload);
      state.savedPopularSort = state.offersByCity;
      state.activeSort = 'Popular';
    })
    .addCase(favoriteOfferChange, (state, action) => {
      state.offers = toggleFavoriteCard(state.offers, action.payload.id);
      state.offersByCity = toggleFavoriteCard(state.offersByCity, action.payload.id);
      state.nearbyOffers = toggleFavoriteCard(state.nearbyOffers, action.payload.id);
      state.favoritesCount = countFavorites(state.offers);
      state.favoriteOffers = getFavorites(state.offers);
      state.savedPopularSort = toggleFavoriteCard(state.savedPopularSort, action.payload.id);
      if (state.activeOffer !== null && state.activeOffer.id === action.payload.id) {
        state.activeOffer.isFavorite = !state.activeOffer.isFavorite;
      }
    })
    .addCase(sortTypeChange, (state, action) => {
      state.offersByCity = sortChange(state.offersByCity, action.payload, state.savedPopularSort);
      state.activeSort = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersByCity = selectOffers(state.offers, state.activeCityName);
      state.savedPopularSort = selectOffers(state.offers, state.activeCityName);
      state.favoriteOffers = getFavorites(state.offers);
      state.favoritesCount = state.favoriteOffers.length;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(fetchOfferData, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(fetchNearbyOffersData, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchOfferCommentsData, (state, action) => {
      state.activeOfferReviews = action.payload;
    })
    .addCase(logIn, (state, action) => {
      //state.favoritesCount = action.payload.length;
    })
    .addCase(logOut, (state) => {
      state.favoriteOffers = getFavorites([]);
      state.favoritesCount = 0;
      state.offers = cleanFavorites(state.offers);
      state.offersByCity = cleanFavorites(state.offersByCity);
      state.nearbyOffers = cleanFavorites(state.nearbyOffers);
      state.savedPopularSort = cleanFavorites(state.savedPopularSort);
      if (state.activeOffer) {
        state.activeOffer.isFavorite = false;
      }
    });
});

export { reducer };
