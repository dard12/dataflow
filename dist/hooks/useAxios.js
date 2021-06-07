"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAxiosGet = exports.axiosGet = exports.axiosPost = exports.axiosDelete = exports.axiosInit = void 0;
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var axios_1 = __importDefault(require("axios"));
var actions_1 = require("../redux/actions");
var axios = axios_1.default.create();
function axiosInit(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
}
exports.axiosInit = axiosInit;
function axiosDelete(url, params, options) {
    return axios.delete(url, { data: params }).then(function (_a) {
        var data = _a.data;
        loadDocs(data, options);
        return data;
    });
}
exports.axiosDelete = axiosDelete;
function axiosPost(url, params, options) {
    return axios.post(url, params).then(function (_a) {
        var data = _a.data;
        loadDocs(data, options);
        return data;
    });
}
exports.axiosPost = axiosPost;
function axiosGet(url, params, options) {
    return axios(url, { method: 'get', params: params }).then(function (_a) {
        var data = _a.data;
        loadDocs(data, options);
        return data;
    });
}
exports.axiosGet = axiosGet;
function useAxiosGet(url, latestParams, options) {
    var cachedResult = options === null || options === void 0 ? void 0 : options.cachedResult;
    var reloadOnChange = options === null || options === void 0 ? void 0 : options.reloadOnChange;
    var reloadCallback = options === null || options === void 0 ? void 0 : options.reloadCallback;
    var name = options === null || options === void 0 ? void 0 : options.name;
    var dispatch = options === null || options === void 0 ? void 0 : options.dispatch;
    var _a = react_1.useState(false), isSuccess = _a[0], setIsSuccess = _a[1];
    var _b = react_1.useState(false), error = _b[0], setError = _b[1];
    var _c = react_1.useState(undefined), result = _c[0], setResult = _c[1];
    var _d = react_1.useState(latestParams), params = _d[0], setParams = _d[1];
    var _e = react_1.useState(cachedResult), cache = _e[0], setCache = _e[1];
    if (reloadOnChange && !lodash_1.default.isEqual(params, latestParams)) {
        setCache(null);
        setParams(latestParams);
        reloadCallback && reloadCallback();
    }
    react_1.useEffect(function () {
        var isMounted = true;
        setIsSuccess(false);
        if (!lodash_1.default.isEmpty(cache)) {
            setResult({ docs: [cache] });
            setIsSuccess(true);
        }
        else {
            axiosGet(url, params, { dispatch: dispatch })
                .then(function (data) {
                if (isMounted) {
                    // console.log({ name, url, params, data });
                    var updates = data === null || data === void 0 ? void 0 : data.updates;
                    var result_1 = updates
                        ? lodash_1.default.map(updates, cleanResult)
                        : cleanResult(data);
                    setResult(result_1);
                    setIsSuccess(true);
                }
            })
                .catch(function (error) {
                if (isMounted) {
                    setError(error);
                }
            });
        }
        return function () {
            isMounted = false;
        };
    }, [url, params, cache, name, dispatch]);
    return { isSuccess: isSuccess, error: error, result: result };
}
exports.useAxiosGet = useAxiosGet;
function loadDocs(result, options) {
    var dispatch = options === null || options === void 0 ? void 0 : options.dispatch;
    if (dispatch) {
        var updates = result === null || result === void 0 ? void 0 : result.updates;
        if (updates) {
            lodash_1.default.each(updates, dispatch(actions_1.loadDocsAction));
        }
        else {
            dispatch(actions_1.loadDocsAction(result));
        }
    }
}
function cleanResult(_a) {
    var docs = _a.docs, next = _a.next, page = _a.page, collection = _a.collection;
    return {
        docs: docs,
        next: next,
        page: lodash_1.default.toInteger(page),
        collection: collection,
    };
}
exports.default = axios;
//# sourceMappingURL=useAxios.js.map