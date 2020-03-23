"use strict";
/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Util_1 = require("../util/Util");
var typedef_1 = require("../typedef");
var ClickableWrapper = /** @class */ (function (_super) {
    __extends(ClickableWrapper, _super);
    function ClickableWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.clickCount = 0;
        _this.handleClick = function (event) {
            var _a = _this.props, doubleClickDelay = _a.doubleClickDelay, onSingleClick = _a.onSingleClick, onDoubleClick = _a.onDoubleClick, onAllClicks = _a.onAllClicks;
            var inputEvent = {
                type: typedef_1.InputEventType.Mouse,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
            };
            if (Util_1.isFunction(onAllClicks))
                onAllClicks(inputEvent);
            _this.clickCount++;
            if (_this.clickCount === 1) {
                if (Util_1.isFunction(onSingleClick)) {
                    event.preventDefault();
                    onSingleClick(inputEvent);
                }
                _this.clickCount = 1;
                // @ts-ignore
                _this.clickTimeout = setTimeout(function () { return (_this.clickCount = 0); }, doubleClickDelay);
            }
            else if (_this.clickCount === 2) {
                if (Util_1.isFunction(onDoubleClick)) {
                    event.preventDefault();
                    onDoubleClick(inputEvent);
                }
                if (Util_1.isNumber(_this.clickTimeout)) {
                    clearTimeout(_this.clickTimeout);
                    _this.clickTimeout = undefined;
                    _this.clickCount = 0;
                }
            }
        };
        _this.handleKeyDown = function (event) {
            var _a = _this.props, onSingleClick = _a.onSingleClick, onDoubleClick = _a.onDoubleClick, onAllClicks = _a.onAllClicks;
            var key = Util_1.detectKey(event);
            var inputEvent = {
                type: typedef_1.InputEventType.Keyboard,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                key: key,
            };
            if (Util_1.isFunction(onAllClicks))
                onAllClicks(inputEvent);
            if (key === typedef_1.KbKey.Space) {
                if (Util_1.isFunction(onSingleClick)) {
                    event.preventDefault();
                    onSingleClick(inputEvent);
                }
            }
            else if (key === typedef_1.KbKey.Enter) {
                if (Util_1.isFunction(onDoubleClick)) {
                    event.preventDefault();
                    onDoubleClick(inputEvent);
                }
            }
        };
        return _this;
    }
    ClickableWrapper.prototype.render = function () {
        var _a = this.props, children = _a.children, WrapperTag = _a.wrapperTag, passthroughProps = _a.passthroughProps, onSingleClick = _a.onSingleClick, onDoubleClick = _a.onDoubleClick;
        var compProps = {
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
        };
        if (Util_1.isFunction(onSingleClick) || Util_1.isFunction(onDoubleClick))
            compProps.tabIndex = 0;
        var mergedProps = __assign(__assign({}, compProps), passthroughProps);
        return react_1.default.createElement(WrapperTag, __assign({}, mergedProps), children);
    };
    return ClickableWrapper;
}(react_1.default.Component));
exports.default = ClickableWrapper;
//# sourceMappingURL=ClickableWrapper.js.map