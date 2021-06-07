"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocList = exports.useDoc = exports.useUsername = exports.useUser = exports.useIsMyself = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var lodash_1 = __importDefault(require("lodash"));
var react_redux_1 = require("react-redux");
var userSelector = toolkit_1.createSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.login) === null || _a === void 0 ? void 0 : _a.id; }, function (user) { return user; });
var usernameSelector = toolkit_1.createSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.login) === null || _a === void 0 ? void 0 : _a.username; }, function (username) { return username; });
var createDocSelector = function (_a) {
    var collection = _a.collection, id = _a.id;
    return toolkit_1.createSelector(function (state) { var _a, _b; return (id ? (_b = (_a = state === null || state === void 0 ? void 0 : state.collections) === null || _a === void 0 ? void 0 : _a[collection]) === null || _b === void 0 ? void 0 : _b[id] : undefined); }, function (doc) { return doc; });
};
var createDocListSelector = function (_a) {
    var collection = _a.collection, filter = _a.filter, order = _a.order;
    return toolkit_1.createSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.collections) === null || _a === void 0 ? void 0 : _a[collection]; }, function (collectionDict) {
        var docList = lodash_1.default.values(collectionDict);
        if (filter) {
            docList = lodash_1.default.filter(docList, filter);
        }
        if (order) {
            docList = lodash_1.default.orderBy.apply(lodash_1.default, __spreadArray([docList], order));
        }
        return docList;
    });
};
var useIsMyself = function (user) {
    var loggedInUser = react_redux_1.useSelector(userSelector);
    return Boolean(user && user === loggedInUser);
};
exports.useIsMyself = useIsMyself;
var useUser = function () {
    return react_redux_1.useSelector(userSelector);
};
exports.useUser = useUser;
var useUsername = function () {
    return react_redux_1.useSelector(usernameSelector);
};
exports.useUsername = useUsername;
var useDoc = function (_a) {
    var collection = _a.collection, id = _a.id;
    return react_redux_1.useSelector(createDocSelector({ collection: collection, id: id }));
};
exports.useDoc = useDoc;
var useDocList = function (_a) {
    var collection = _a.collection, filter = _a.filter, order = _a.order;
    return react_redux_1.useSelector(createDocListSelector({ collection: collection, filter: filter, order: order }));
};
exports.useDocList = useDocList;
//# sourceMappingURL=selectors.js.map