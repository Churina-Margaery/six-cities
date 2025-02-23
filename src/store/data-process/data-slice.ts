import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataState } from '../../types/state';
import { NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { Offer as FullOffer } from '../../types/separated-offers';
import { Reviews } from '../../types/reviews';
import { logOut } from '../user-process/user-slice';
import { sortTypeChange } from '../main-process/main-slice';
import { SortTypes } from '../../const';


function getFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite);
}

function countFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite).length;
}

function toggleFavoriteCard(offers: Offers, id: string) {
  return offers.map((offer) => offer.id === id ? { ...offer, isFavorite: !offer.isFavorite } : offer);
}

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

const initialState: DataState = {
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  favoritesCount: 0,
  isOffersDataLoading: false,
  activeOffer: null,
  activeOfferReviews: [],
  error: null,

  activeCityName: 'Paris',
  offersByCity: [],
  savedPopularSort: [],
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
      state.favoriteOffers = getFavorites(state.offers);
      state.favoritesCount = state.favoriteOffers.length;

      state.offersByCity = selectOffers(state.offers, state.activeCityName);
      state.savedPopularSort = selectOffers(state.offers, state.activeCityName);
    },
    changeCity: (state, action: PayloadAction<string>) => {
      state.activeCityName = action.payload;
      state.offersByCity = selectOffers(state.offers, action.payload);
      state.savedPopularSort = state.offersByCity;
    },
    favoriteOfferChange: (state, action: PayloadAction<{ id: string }>) => {
      state.offers = toggleFavoriteCard(state.offers, action.payload.id);
      state.offersByCity = toggleFavoriteCard(state.offersByCity, action.payload.id);
      state.nearbyOffers = toggleFavoriteCard(state.nearbyOffers, action.payload.id);
      state.favoritesCount = countFavorites(state.offers);
      state.favoriteOffers = getFavorites(state.offers);
      state.savedPopularSort = toggleFavoriteCard(state.savedPopularSort, action.payload.id);
      if (state.activeOffer?.id === action.payload.id) {
        state.activeOffer.isFavorite = !state.activeOffer.isFavorite;
      }
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoading = action.payload;
    },
    fetchOfferData: (state, action: PayloadAction<FullOffer>) => {
      state.activeOffer = action.payload;
    },
    fetchNearbyOffersData: (state, action: PayloadAction<Offers>) => {
      state.nearbyOffers = action.payload;
    },
    fetchOfferCommentsData: (state, action: PayloadAction<Reviews>) => {
      state.activeOfferReviews = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut, (state) => {
        const cleanFavorites = (offers: Offers) =>
          offers.map((offer) => ({ ...offer, isFavorite: false }));

        state.offers = cleanFavorites(state.offers);
        state.nearbyOffers = cleanFavorites(state.nearbyOffers);
        state.favoriteOffers = [];
        state.favoriteOffers = getFavorites([]);
        state.favoritesCount = 0;
        state.offers = cleanFavorites(state.offers);
        state.nearbyOffers = cleanFavorites(state.nearbyOffers);
        if (state.activeOffer) {
          state.activeOffer.isFavorite = false;
        }
        state.offersByCity = cleanFavorites(state.offersByCity);
        state.savedPopularSort = cleanFavorites(state.savedPopularSort);
      })
      .addCase(sortTypeChange, (state, action: PayloadAction<SortTypes>) => {
        state.offersByCity = sortChange(state.offersByCity, action.payload, state.savedPopularSort);
      });
  },
});

export const {
  loadOffers,
  changeCity,
  favoriteOfferChange,
  setOffersDataLoadingStatus,
  fetchOfferData,
  fetchOfferCommentsData,
  setError
} = dataSlice.actions;
export default dataSlice.reducer;
