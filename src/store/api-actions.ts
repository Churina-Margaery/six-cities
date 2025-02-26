import axios, { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';

import { Offers } from '../types/offers.js';
import { Offer } from '../types/separated-offers.js';
import {
  loadOffers, setOffersDataLoadingStatus, fetchOfferData, fetchNearbyOffersData,
  fetchOfferCommentsData, favoriteOfferChange
} from './data-process/data-slice.js';
import { requireAuthorization, setEmail, logIn, logOut } from './user-process/user-slice.js';

import { saveToken, dropToken, getToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Reviews } from '../types/reviews.js';

type OfferId = string;


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const token = getToken();
    const { data } = await api.get<Offers>(APIRoute.Offers, {
      headers: {
        'X-Token': token
      }
    });
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setEmail(email));
      dispatch(fetchOffersAction());
      dispatch(logIn());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Можно добавить обработку разных статус-кодов
        const errorMessage = err.response?.status === 400
          ? 'Неверный email или пароль'
          : 'Ошибка сервера';
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setEmail(''));
    dispatch(logOut());
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      //email?? todo
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchOfferDataAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferData',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(fetchOfferData(data));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffersData',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(fetchNearbyOffersData(data));
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferCommentsData',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    dispatch(fetchOfferCommentsData(data));
  },
);

export const setFavoriteStatusAction = createAsyncThunk<void, { offerId: OfferId; isFavorite: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavoriteStatus',
  async ({ offerId, isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(
      `${APIRoute.Favorite}/${offerId}/${isFavorite}`,
      null
    );
    dispatch(favoriteOfferChange(data));
  },
);

export const postCommentAction = createAsyncThunk<void, {
  offerId: OfferId;
  rating: number;
  comment: string;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, rating, comment }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.post<Comment>(
        `${APIRoute.Comments}/${offerId}`,
        { comment, rating }
      );
      dispatch(fetchOfferCommentsAction(offerId));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.status === 400
          ? 'Неверные данные отзыва'
          : 'Ошибка при отправке отзыва';
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  },
);
