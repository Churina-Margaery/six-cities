import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataState } from '../../types/state';

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

// const dataSlice = createSlice({
//   name: NameSpace.Data,
//   initialState,
//   reducers: {
//     loadOffers: (state, action: PayloadAction<Offers>) => {
//       state.offers = action.payload;
//       state.favoriteOffers = action.payload.filter((offer) => offer.isFavorite);
//     },
//     favoriteOfferChange: (state, action: PayloadAction<{ id: string }>) => {
//       const toggleFavorite = (offers: Offers) =>
//         offers.map((offer) =>
//           offer.id === action.payload.id
//             ? { ...offer, isFavorite: !offer.isFavorite }
//             : offer
//         );

//       state.offers = toggleFavorite(state.offers);
//       state.nearbyOffers = toggleFavorite(state.nearbyOffers);
//       state.favoriteOffers = state.offers.filter((offer) => offer.isFavorite);

//       if (state.activeOffer?.id === action.payload.id) {
//         state.activeOffer.isFavorite = !state.activeOffer.isFavorite;
//       }
//     },
//     setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
//       state.isOffersDataLoading = action.payload;
//     },
//     fetchOfferData: (state, action: PayloadAction<FullOffer>) => {
//       state.activeOffer = action.payload;
//     },
//     fetchNearbyOffersData: (state, action: PayloadAction<Offers>) => {
//       state.nearbyOffers = action.payload;
//     },
//     fetchOfferCommentsData: (state, action: PayloadAction<Reviews>) => {
//       state.activeOfferReviews = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(logOut, (state) => {
//       const cleanFavorites = (offers: Offers) =>
//         offers.map((offer) => ({ ...offer, isFavorite: false }));

//       state.offers = cleanFavorites(state.offers);
//       state.nearbyOffers = cleanFavorites(state.nearbyOffers);
//       state.favoriteOffers = [];
//       if (state.activeOffer) {
//         state.activeOffer.isFavorite = false;
//       }
//     });
//   },
// });

// export const {
//   loadOffers,
//   favoriteOfferChange,
//   setOffersDataLoadingStatus,
//   fetchOfferData,
//   fetchNearbyOffersData,
//   fetchOfferCommentsData
// } = dataSlice.actions;
// export default dataSlice.reducer;