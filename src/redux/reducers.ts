import _ from 'lodash';
import { createReducer } from '@reduxjs/toolkit';
import { loginAction, logoutAction, loadDocsAction } from './actions';

export const loginReducer = createReducer<{
  token: string | null;
  id: string | null;
  username: string | null;
}>(
  {
    token: window.localStorage.getItem('token'),
    id: window.localStorage.getItem('id'),
    username: window.localStorage.getItem('username'),
  },
  {
    [loginAction.type]: (state, action) => {
      const { token, id, username } = action.payload;
      state.token = token;
      state.id = id;
      state.username = username;
    },

    [logoutAction.type]: (state, action) => {
      state.token = null;
      state.id = null;
      state.username = null;
    },
  },
);

export const collectionsReducer = createReducer<{
  [collection: string]: { [docId: string]: any };
}>(
  {},
  {
    [loadDocsAction.type]: (state, action) => {
      const { docs, collection } = action.payload;

      _.each(docs, (doc) => {
        if (collection === 'user') {
          state[collection] = {
            ...state[collection],
            [doc.id]: doc,
            [doc.username]: doc,
          };
        } else if (collection === 'response') {
          state[collection] = {
            ...state[collection],
            [doc.id]: doc,
            [doc.update_key]: doc,
          };
        } else {
          state[collection] = { ...state[collection], [doc.id]: doc };
        }
      });
    },
  },
);
