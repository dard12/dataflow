import { configureStore } from '@reduxjs/toolkit';
import { loginReducer, collectionsReducer } from './reducers';
import axios from '../hooks/useAxios';

const store = configureStore({
  reducer: { login: loginReducer, collections: collectionsReducer },
});

function persistLogin() {
  const { token, id, username } = store.getState().login;

  if (token && id && username) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    axios.defaults.headers.common.Authorization = null;
  }
}

persistLogin();

store.subscribe(persistLogin);

export default store;
