import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../const';
import { UserState } from '../../types/state';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    logIn: (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    },
    logOut: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = '';
      // state.favoriteOffers = getFavorites([]); $
      // state.favoritesCount = 0;
      // state.offers = cleanFavorites(state.offers);
      // state.offersByCity = cleanFavorites(state.offersByCity);
      // state.nearbyOffers = cleanFavorites(state.nearbyOffers);
      // state.savedPopularSort = cleanFavorites(state.savedPopularSort);
      // if (state.activeOffer) {
      //   state.activeOffer.isFavorite = false;
    }
  },
},
);

export const { requireAuthorization, setEmail, logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
