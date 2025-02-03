import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('main/changeCity', (value: string) => ({ payload: value }));
export const favoriteCountChange = createAction('main/favoriteCountChange', (value: number) => ({ payload: value }));
