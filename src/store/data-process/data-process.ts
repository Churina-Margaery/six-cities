import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataState } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { Offer as FullOffer } from '../../types/separated-offers';
import { Reviews } from '../../types/reviews';
import { logOut } from '../user-process/user-process';
import { sortTypeChange } from '../main-process/main-process';

function getFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite);
}

function countFavorites(offers: Offers) {
  return offers.filter((offer) => offer.isFavorite).length;
}

function toggleFavoriteCard(offers: Offers, id: string) {
  return offers.map((offer) => offer.id === id ? { ...offer, isFavorite: !offer.isFavorite } : offer);
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
};

const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
      state.favoriteOffers = getFavorites(state.offers);
      state.favoritesCount = state.favoriteOffers.length;

      // state.offersByCity = selectOffers(state.offers, state.activeCityName); !!!
      // state.savedPopularSort = selectOffers(state.offers, state.activeCityName);
    },
    favoriteOfferChange: (state, action: PayloadAction<{ id: string }>) => {
      state.offers = toggleFavoriteCard(state.offers, action.payload.id);
      // state.offersByCity = toggleFavoriteCard(state.offersByCity, action.payload.id);
      state.nearbyOffers = toggleFavoriteCard(state.nearbyOffers, action.payload.id);
      state.favoritesCount = countFavorites(state.offers);
      state.favoriteOffers = getFavorites(state.offers);
      // state.savedPopularSort = toggleFavoriteCard(state.savedPopularSort, action.payload.id);
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
    builder.addCase(logOut, (state) => {
      const cleanFavorites = (offers: Offers) =>
        offers.map((offer) => ({ ...offer, isFavorite: false }));

      state.offers = cleanFavorites(state.offers);
      state.nearbyOffers = cleanFavorites(state.nearbyOffers);
      state.favoriteOffers = [];
      if (state.activeOffer) {
        state.activeOffer.isFavorite = false;
      }
      state.favoriteOffers = getFavorites([]);
      state.favoritesCount = 0;
      state.offers = cleanFavorites(state.offers);
      state.nearbyOffers = cleanFavorites(state.nearbyOffers);
      if (state.activeOffer) {
        state.activeOffer.isFavorite = false;
      }
    })
      .addCase(sortTypeChange, () => {
        state.offersByCity = sortChange(state.offersByCity, action.payload, state.savedPopularSort);
      });
  },
});

export const {
  loadOffers,
  favoriteOfferChange,
  setOffersDataLoadingStatus,
  fetchOfferData,
  fetchNearbyOffersData,
  fetchOfferCommentsData
} = dataSlice.actions;
export default dataSlice.reducer;
