export declare const useIsMyself: (user?: string | undefined) => boolean;
export declare const useUser: () => string;
export declare const useUsername: () => string;
export declare const useDoc: ({ collection, id, }: {
    collection: string;
    id?: string | undefined;
}) => any;
export declare const useDocList: ({ collection, filter, order, }: {
    collection: string;
    filter?: any;
    order?: any;
}) => any[];
