"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var reducers_1 = require("./reducers");
var useAxios_1 = __importDefault(require("../hooks/useAxios"));
var store = toolkit_1.configureStore({
    reducer: { login: reducers_1.loginReducer, collections: reducers_1.collectionsReducer },
});
function persistLogin() {
    var _a = store.getState().login, token = _a.token, id = _a.id, username = _a.username;
    if (token && id && username) {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('username', username);
        useAxios_1.default.defaults.headers.common.Authorization = "Bearer " + token;
    }
    else {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        useAxios_1.default.defaults.headers.common.Authorization = null;
    }
}
persistLogin();
store.subscribe(persistLogin);
exports.default = store;
//# sourceMappingURL=store.js.map