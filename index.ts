import axios, {
  axiosInit,
  axiosDelete,
  axiosGet,
  axiosPost,
  useAxiosGet,
} from './src/hooks/useAxios';

import { useLoadDoc, useLoadDocList } from './src/hooks/useLoadDoc';
import { useUsername } from './src/hooks/useUsername';

import {
  useIsMyself,
  useUserSelector,
  useUsernameSelector,
  useDocSelector,
  useDocListSelector,
} from './src/redux/selectors';

import { loginAction, logoutAction, loadDocsAction } from './src/redux/actions';

import store from './src/redux/store';

import {
  GetQuery,
  execute,
  sendUpdate,
  sendError,
  sendSuccess,
} from './src-server/server-util';

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
  // useUsername
  useUsername,
  // selectors
  useIsMyself,
  useUserSelector,
  useUsernameSelector,
  useDocSelector,
  useDocListSelector,
  // actions
  loginAction,
  logoutAction,
  loadDocsAction,
  // store
  store,
  // src-server
  GetQuery,
  execute,
  sendUpdate,
  sendError,
  sendSuccess,
};
