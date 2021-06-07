import { createAction } from '@reduxjs/toolkit';

export const loginAction = createAction<any>('loginAction');
export const logoutAction = createAction('logoutAction');
export const loadDocsAction = createAction<any>('loadDocsAction');
