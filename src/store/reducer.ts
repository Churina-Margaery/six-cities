import { createReducer } from '@reduxjs/toolkit';
import { changeCity, favoriteOfferChange } from './action';
import { offers as startOffers } from '../mocks/offers';
import { Offers } from '../types/offers';

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

const initialState = {
  activeCityName: 'Paris',
  offersByCity: selectOffers(startOffers, 'Paris'),
  favoritesCount: countFavorites(startOffers),
  offers: startOffers,
  nearbyOffers: startOffers,
  favoriteOffers: getFavorites(startOffers),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCityName = action.payload;
      state.offersByCity = selectOffers(state.offers, action.payload);
    })
    .addCase(favoriteOfferChange, (state, action) => {
      state.offers = toggleFavoriteCard(state.offers, action.payload.id);
      state.offersByCity = toggleFavoriteCard(state.offersByCity, action.payload.id);
      state.nearbyOffers = toggleFavoriteCard(state.nearbyOffers, action.payload.id);
      state.favoritesCount = countFavorites(state.offers);
      state.favoriteOffers = getFavorites(state.offers);
    });
});

export { reducer };
