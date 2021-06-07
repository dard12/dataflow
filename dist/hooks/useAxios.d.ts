declare const axios: import("axios").AxiosInstance;
export declare function axiosInit(baseURL: string): void;
export declare function axiosDelete(url: string, params: any, options?: {
    dispatch?: Function;
}): Promise<any>;
export declare function axiosPost(url: string, params: any, options?: {
    dispatch?: Function;
}): Promise<any>;
export declare function axiosGet(url: string, params?: any, options?: {
    dispatch?: Function;
}): Promise<any>;
export declare function useAxiosGet(url: string, latestParams: any, options: {
    name: string;
    reloadOnChange?: boolean;
    reloadCallback?: Function;
    cachedResult?: any;
    dispatch?: Function;
}): {
    isSuccess: boolean;
    error: boolean;
    result: any;
};
export default axios;
