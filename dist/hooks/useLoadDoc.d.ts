export declare const useLoadDoc: ({ name, collection, id, query, }: {
    name: string;
    collection: string;
    id?: string | undefined;
    query?: any;
}) => {
    doc: any;
    isSuccess: boolean;
    error: boolean;
    result: any;
};
export declare const useLoadDocList: ({ name, collection, query, filter, order, }: {
    name: string;
    collection: string;
    query: any;
    filter?: any;
    order?: any;
}) => {
    docs: any[];
    isSuccess: boolean;
    error: boolean;
    result: any;
};
