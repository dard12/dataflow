import axios, {
  axiosInit,
  axiosDelete,
  axiosGet,
  axiosPost,
  useAxiosGet,
} from './hooks/useAxios';

import { useLoadDoc, useLoadDocList } from './hooks/useLoadDoc';

import {
  useIsMyself,
  useUser,
  useUsername,
  useDoc,
  useDocList,
} from './redux/selectors';

import { loginAction, logoutAction, loadDocsAction } from './redux/actions';

import store from './redux/store';

import {
  GetQuery,
  execute,
  sendUpdate,
  sendError,
  sendSuccess,
} from './server-util';

export {
  // useAxios
  axios,
  axiosInit,
  axiosDelete,
  axiosGet,
  axiosPost,
  useAxiosGet,
  // useLoadDoc
  useLoadDoc,
  useLoadDocList,
  // selectors
  useIsMyself,
  useUser,
  useUsername,
  useDoc,
  useDocList,
  // actions
  loginAction,
  logoutAction,
  loadDocsAction,
  // store
  store,
  // src-server
  execute,
  sendUpdate,
  sendError,
  sendSuccess,
};

export type { GetQuery };
