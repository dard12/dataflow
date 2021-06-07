import { QueryBuilder } from 'knex';
import _ from 'lodash';
import { Response } from 'express';

interface QueryOptions {
  page?: number;
  pageSize?: number;
}

export interface GetQuery<Doc, AdditionalFields = {}> {
  query: Partial<Doc> & QueryOptions & AdditionalFields;
  user?: any;
}

interface UpdateResponse {
  docs: any[];
  collection: string;
  page?: number;
  next?: number[] | null;
}

export async function execute(
  pgQuery: QueryBuilder,
  collection: string,
  options?: QueryOptions & { [ignored: string]: any },
): Promise<UpdateResponse> {
  const page = _.toNumber(options?.page) || 1;
  const databasePage = page - 1;
  const pageSize = _.toNumber(options?.pageSize) || 5;

  const docs = await pgQuery
    .clone()
    .limit(pageSize)
    .offset(pageSize * databasePage);

  const hasPageAhead = async (ahead: number) => {
    return _.size(
      await pgQuery
        .clone()
        .limit(1)
        .offset(pageSize * (databasePage + ahead)),
    );
  };

  let next = null;

  if (await hasPageAhead(5)) {
    next = _.range(page + 1, page + 6);
  } else if (await hasPageAhead(4)) {
    next = _.range(page + 1, page + 5);
  } else if (await hasPageAhead(3)) {
    next = _.range(page + 1, page + 4);
  } else if (await hasPageAhead(2)) {
    next = _.range(page + 1, page + 3);
  } else if (await hasPageAhead(1)) {
    next = _.range(page + 1, page + 2);
  }

  return { docs, page, next, collection };
}

export function sendUpdate(
  res: Response,
  update: UpdateResponse | { updates: UpdateResponse[] },
) {
  res.status(200).send(update);
}

export function sendError(res: Response, code = 400) {
  res.status(code).send();
}

export function sendSuccess(res: Response, data?: any) {
  res.status(200).send(data);
}
