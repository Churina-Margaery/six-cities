import { createReducer } from '@reduxjs/toolkit';
import { changeCity, favoriteOfferChange, sortTypeChange } from './action';
import { offers as startOffers } from '../mocks/offers';
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

const initialState = {
  activeCityName: 'Paris',
  offersByCity: selectOffers(startOffers, 'Paris'),
  favoritesCount: countFavorites(startOffers),
  offers: startOffers,
  nearbyOffers: startOffers,
  favoriteOffers: getFavorites(startOffers),
  activeSort: 'Popular',
  savedPopularSort: selectOffers(startOffers, 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCityName = action.payload;
      state.offersByCity = selectOffers(state.offers, action.payload);
      state.savedPopularSort = selectOffers(startOffers, action.payload);
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
    });
});

export { reducer };
