declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    login: {
        token: string | null;
        id: string | null;
        username: string | null;
    };
    collections: {
        [collection: string]: {
            [docId: string]: any;
        };
    };
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    login: {
        token: string | null;
        id: string | null;
        username: string | null;
    };
    collections: {
        [collection: string]: {
            [docId: string]: any;
        };
    };
}, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    login: {
        token: string | null;
        id: string | null;
        username: string | null;
    };
    collections: {
        [collection: string]: {
            [docId: string]: any;
        };
    };
}, import("redux").AnyAction, undefined>]>;
export default store;
