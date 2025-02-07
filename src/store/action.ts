import { createAction } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../const';
import { Offers } from '../types/offers';

export const changeCity = createAction('main/changeCity', (value: string) => ({ payload: value }));

export const favoriteOfferChange = createAction('main/favoriteOfferChange', (value: { id: string }) => ({ payload: value }));

export const sortTypeChange = createAction('main/sortTypeChange', (value: string) => ({ payload: value }));

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('main/setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
