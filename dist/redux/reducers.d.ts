export declare const loginReducer: import("redux").Reducer<{
    token: string | null;
    id: string | null;
    username: string | null;
}, import("redux").AnyAction>;
export declare const collectionsReducer: import("redux").Reducer<{
    [collection: string]: {
        [docId: string]: any;
    };
}, import("redux").AnyAction>;
