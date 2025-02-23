import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../const';
import { MainState } from '../../types/state';
import { NameSpace } from '../../const';
import { logOut } from '../user-process/user-process';
import { Offer, Offers } from '../../types/offers';

function selectOffers(offers: Offers, cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}

function priceDown(offerA: Offer, offerB: Offer) {
  return offerA.price - offerB.price;
}

function priceUp(offerA: Offer, offerB: Offer) {
  return offerB.price - offerA.price;
}

function ratingUp(offerA: Offer, offerB: Offer) {
  return offerB.rating - offerA.rating;
}


function sortChange(offers: Offers, type: string, popularOffers: Offers) {
  switch (type) {
    case SortTypes.PriceLowToHigh:
      return offers.sort(priceDown);
    case SortTypes.PriceHighToLow:
      return offers.sort(priceUp);
    case SortTypes.RatingTop:
      return offers.sort(ratingUp);
    case SortTypes.Popular:
      return popularOffers;
  }

  return offers;
}

const initialState: MainState = {
  activeCityName: 'Paris',
  activeSort: SortTypes.Popular,
  savedPopularSort: [],
  offersByCity: [],
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.activeCityName = action.payload;
      //state.offersByCity = selectOffers(state.offers, action.payload);
      //state.savedPopularSort = state.offersByCity;
      state.activeSort = SortTypes.Popular;
    },
    sortTypeChange: (state, action: PayloadAction<SortTypes>) => {
      state.activeSort = action.payload;
      state.offersByCity = sortChange(state.offersByCity, action.payload, state.savedPopularSort);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      const cleanFavorites = (offers: Offers) =>
        offers.map((offer) => ({ ...offer, isFavorite: false }));
      state.offersByCity = cleanFavorites(state.offersByCity);
      state.savedPopularSort = cleanFavorites(state.savedPopularSort);
    });
  },
});

export const { changeCity, sortTypeChange } = mainSlice.actions;
export default mainSlice.reducer;
