import { useEffect, useState } from 'react';
import _ from 'lodash';
import Axios from 'axios';
import { loadDocsAction } from '../redux/actions';

const axios = Axios.create();

export function axiosInit(baseURL: string) {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
}

export function axiosDelete(
  url: string,
  params: any,
  options?: { dispatch?: Function },
) {
  return axios.delete(url, { data: params }).then(({ data }) => {
    loadDocs(data, options);
    return data;
  });
}

export function axiosPost(
  url: string,
  params: any,
  options?: { dispatch?: Function },
) {
  return axios.post(url, params).then(({ data }) => {
    loadDocs(data, options);
    return data;
  });
}

export function axiosGet(
  url: string,
  params?: any,
  options?: { dispatch?: Function },
) {
  return axios(url, { method: 'get', params }).then(({ data }) => {
    loadDocs(data, options);
    return data;
  });
}

export function useAxiosGet(
  url: string,
  latestParams: any,
  options: {
    name: string;
    reloadOnChange?: boolean;
    reloadCallback?: Function;
    cachedResult?: any;
    dispatch?: Function;
  },
) {
  const cachedResult = options?.cachedResult;
  const reloadOnChange = options?.reloadOnChange;
  const reloadCallback = options?.reloadCallback;
  const name = options?.name;
  const dispatch = options?.dispatch;

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<any>(undefined);
  const [params, setParams] = useState(latestParams);
  const [cache, setCache] = useState(cachedResult);

  if (reloadOnChange && !_.isEqual(params, latestParams)) {
    setCache(null);
    setParams(latestParams);
    reloadCallback && reloadCallback();
  }

  useEffect(() => {
    let isMounted = true;

    setIsSuccess(false);

    if (!_.isEmpty(cache)) {
      setResult({ docs: [cache] });
      setIsSuccess(true);
    } else {
      axiosGet(url, params, { dispatch })
        .then((data) => {
          if (isMounted) {
            // console.log({ name, url, params, data });

            const updates = data?.updates;

            const result = updates
              ? _.map(updates, cleanResult)
              : cleanResult(data);

            setResult(result);
            setIsSuccess(true);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [url, params, cache, name, dispatch]);

  return { isSuccess, error, result };
}

function loadDocs(result: any, options?: { dispatch?: Function }) {
  const dispatch = options?.dispatch;

  if (dispatch) {
    const updates = result?.updates;

    if (updates) {
      _.each(updates, dispatch(loadDocsAction));
    } else {
      dispatch(loadDocsAction(result));
    }
  }
}

function cleanResult({ docs, next, page, collection }: any) {
  return {
    docs,
    next,
    page: _.toInteger(page),
    collection,
  };
}

export default axios;
