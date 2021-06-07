import { QueryBuilder } from 'knex';
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
export declare function execute(pgQuery: QueryBuilder, collection: string, options?: QueryOptions & {
    [ignored: string]: any;
}): Promise<UpdateResponse>;
export declare function sendUpdate(res: Response, update: UpdateResponse | {
    updates: UpdateResponse[];
}): void;
export declare function sendError(res: Response, code?: number): void;
export declare function sendSuccess(res: Response, data?: any): void;
export {};
