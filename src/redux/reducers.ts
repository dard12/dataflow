import _ from 'lodash';
import { createReducer } from '@reduxjs/toolkit';
import { loginAction, logoutAction, loadDocsAction } from './actions';

interface LoginInterface {
  token: string | null;
  id: string | null;
  username: string | null;
}

interface CollectionsInterface {
  [collection: string]: { [docId: string]: any };
}

export const loginReducer = createReducer<LoginInterface>(
  {
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
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

export const collectionsReducer = createReducer<CollectionsInterface>(
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