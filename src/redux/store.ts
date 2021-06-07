import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, collectionsReducer } from './reducers';
import axios from '../hooks/useAxios';

const store = configureStore({
  reducer: { login: loginReducer, collections: collectionsReducer },
});

function persistLogin() {
  const { token, id, username } = store.getState().login;

  if (token && id && username) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('id', id);
    window.localStorage.setItem('username', username);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('username');
    axios.defaults.headers.common.Authorization = null;
  }
}

persistLogin();

store.subscribe(persistLogin);

export default store;
