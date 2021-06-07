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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadDocList = exports.useLoadDoc = void 0;
var react_redux_1 = require("react-redux");
var selectors_1 = require("../redux/selectors");
var useAxios_1 = require("./useAxios");
var useLoadDoc = function (_a) {
    var name = _a.name, collection = _a.collection, id = _a.id, query = _a.query;
    var dispatch = react_redux_1.useDispatch();
    var doc = selectors_1.useDoc({ collection: collection, id: id });
    var fetchResult = useAxios_1.useAxiosGet("/api/" + collection, query || { id: id }, {
        name: name + " | " + collection + " | " + id,
        reloadOnChange: true,
        cachedResult: doc,
        dispatch: dispatch,
    });
    return __assign(__assign({}, fetchResult), { doc: doc });
};
exports.useLoadDoc = useLoadDoc;
var useLoadDocList = function (_a) {
    var name = _a.name, collection = _a.collection, query = _a.query, filter = _a.filter, order = _a.order;
    var dispatch = react_redux_1.useDispatch();
    var docs = selectors_1.useDocList({ collection: collection, filter: filter, order: order });
    var fetchResult = useAxios_1.useAxiosGet("/api/" + collection, query, {
        name: name + " | " + collection + " | List",
        reloadOnChange: true,
        dispatch: dispatch,
    });
    return __assign(__assign({}, fetchResult), { docs: docs });
};
exports.useLoadDocList = useLoadDocList;
//# sourceMappingURL=useLoadDoc.js.map