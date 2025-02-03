import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('main/changeCity', (value: string) => ({ payload: value }));
export const favoriteOfferChange = createAction('main/favoriteOfferChange', (value: { id: string }) => ({ payload: value }));
