import { useDispatch } from 'react-redux';
import { useDocListSelector, useDocSelector } from '../redux/selectors';
import { useAxiosGet } from './useAxios';

export const useLoadDoc = ({
  name,
  collection,
  id,
  query,
}: {
  name: string;
  collection: string;
  id?: string;
  query?: any;
}) => {
  const dispatch = useDispatch();
  const doc = useDocSelector({ collection, id });
  const fetchResult = useAxiosGet(`/api/${collection}`, query || { id }, {
    name: `${name} | ${collection} | ${id}`,
    reloadOnChange: true,
    cachedResult: doc,
    dispatch,
  });

  return { ...fetchResult, doc };
};

export const useLoadDocList = ({
  name,
  collection,
  query,
  filter,
  order,
}: {
  name: string;
  collection: string;
  query: any;
  filter?: any;
  order?: any;
}) => {
  const dispatch = useDispatch();
  const docs = useDocListSelector({ collection, filter, order });
  const fetchResult = useAxiosGet(`/api/${collection}`, query, {
    name: `${name} | ${collection} | List`,
    reloadOnChange: true,
    dispatch,
  });

  return { ...fetchResult, docs };
};
