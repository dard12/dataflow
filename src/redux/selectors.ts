import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const userSelector = createSelector(
  (state: any) => state?.login?.id,
  (user: string) => user,
);

const usernameSelector = createSelector(
  (state: any) => state?.login?.username,
  (username: string) => username,
);

const createDocSelector = ({
  collection,
  id,
}: {
  collection: string;
  id?: string;
}) => {
  return createSelector(
    (state: any) => (id ? state?.collections?.[collection]?.[id] : undefined),
    (doc) => doc,
  );
};

const createDocListSelector = ({
  collection,
  filter,
  order,
}: {
  collection: string;
  filter?: any;
  order?: any;
}): any => {
  return createSelector(
    (state: any) => state?.collections?.[collection],
    (collectionDict) => {
      let docList = _.values(collectionDict);

      if (filter) {
        docList = _.filter(docList, filter);
      }

      if (order) {
        docList = _.orderBy(docList, ...order);
      }

      return docList;
    },
  );
};

export const useIsMyself = (user?: string) => {
  const loggedInUser = useSelector(userSelector);
  return Boolean(user && user === loggedInUser);
};

export const useUser = () => {
  return useSelector(userSelector);
};

export const useUsername = () => {
  return useSelector(usernameSelector);
};

export const useDoc = ({
  collection,
  id,
}: {
  collection: string;
  id?: string;
}) => {
  return useSelector(createDocSelector({ collection, id }));
};

export const useDocList = ({
  collection,
  filter,
  order,
}: {
  collection: string;
  filter?: any;
  order?: any;
}): any[] => {
  return useSelector(createDocListSelector({ collection, filter, order }));
};
