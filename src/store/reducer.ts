import { createReducer } from '@reduxjs/toolkit';
import { changeCity, favoriteCount, favoriteCountChange } from './action';
import { offers } from '../mocks/offers';

function selectOffers(cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}

const initialState = {
  activeCityName: 'Paris',
  offers: selectOffers('Paris'),
  favoritesCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCityName = action.payload;
      state.offers = selectOffers(action.payload);
    })
    .addCase(favoriteCountChange, (state, action) => {
      state.favoritesCount += action.payload;
    });
});

export { reducer };
