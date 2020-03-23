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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var typedef_1 = require("../typedef");
var Util_1 = require("../util/Util");
var ConfigContext_1 = require("./ConfigContext");
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconButton.prototype.render = function () {
        var _a = this.props, icon = _a.icon, active = _a.active, tooltip = _a.tooltip, onClick = _a.onClick;
        var _b = this.context, Icon = _b.Icon, icons = _b.icons;
        var className = classnames_1.default({
            'chonky-icon-button': true,
            'chonky-active': active,
            'chonky-tooltip': Util_1.isString(tooltip),
        });
        var buttonProps = {
            className: className,
        };
        if (Util_1.isFunction(onClick)) {
            buttonProps.onClick = function (event) {
                var inputEvent = {
                    type: typedef_1.InputEventType.Mouse,
                    ctrlKey: event.ctrlKey,
                    shiftKey: event.shiftKey,
                };
                onClick(inputEvent);
            };
        }
        else
            buttonProps.disabled = true;
        if (Util_1.isString(tooltip))
            buttonProps['data-tooltip'] = tooltip;
        return (React.createElement("button", __assign({}, buttonProps),
            React.createElement(Icon, { icon: Util_1.isNil(icon) ? icons.fallbackIcon : icon })));
    };
    IconButton.contextType = ConfigContext_1.ConfigContext;
    IconButton.defaultProps = {
        active: false,
    };
    return IconButton;
}(React.PureComponent));
exports.default = IconButton;
//# sourceMappingURL=IconButton.js.map