"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsReducer = exports.loginReducer = void 0;
var lodash_1 = __importDefault(require("lodash"));
var toolkit_1 = require("@reduxjs/toolkit");
var actions_1 = require("./actions");
exports.loginReducer = toolkit_1.createReducer({
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
}, (_a = {},
    _a[actions_1.loginAction.type] = function (state, action) {
        var _a = action.payload, token = _a.token, id = _a.id, username = _a.username;
        state.token = token;
        state.id = id;
        state.username = username;
    },
    _a[actions_1.logoutAction.type] = function (state, action) {
        state.token = null;
        state.id = null;
        state.username = null;
    },
    _a));
exports.collectionsReducer = toolkit_1.createReducer({}, (_b = {},
    _b[actions_1.loadDocsAction.type] = function (state, action) {
        var _a = action.payload, docs = _a.docs, collection = _a.collection;
        lodash_1.default.each(docs, function (doc) {
            var _a, _b, _c;
            if (collection === 'user') {
                state[collection] = __assign(__assign({}, state[collection]), (_a = {}, _a[doc.id] = doc, _a[doc.username] = doc, _a));
            }
            else if (collection === 'response') {
                state[collection] = __assign(__assign({}, state[collection]), (_b = {}, _b[doc.id] = doc, _b[doc.update_key] = doc, _b));
            }
            else {
                state[collection] = __assign(__assign({}, state[collection]), (_c = {}, _c[doc.id] = doc, _c));
            }
        });
    },
    _b));
//# sourceMappingURL=reducers.js.map