export interface QueryOptions {
  page?: number;
  pageSize?: number;
}

export interface GetQuery<Doc, AdditionalFields = {}> {
  query: Partial<Doc> & QueryOptions & AdditionalFields;
  user?: any;
}

export interface UpdateResponse {
  docs: any[];
  collection: string;
  page?: number;
  next?: number[] | null;
}
