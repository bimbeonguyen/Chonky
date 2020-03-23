"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Util_1 = require("../util/Util");
var randomInt = function (min, max) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
};
var randomNoise = function (noise) { return randomInt(-noise, +noise); };
var LoadingPlaceholder = function (props) {
    var compProps = {
        className: 'chonky-loading-placeholder',
        style: {
            maxWidth: Util_1.isNumber(props.maxWidth)
                ? props.maxWidth
                : 30 + randomNoise(10) + "%",
        },
    };
    return React.createElement("div", __assign({}, compProps), "\u00A0");
};
exports.default = LoadingPlaceholder;
//# sourceMappingURL=LoadingPlaceholder.js.map