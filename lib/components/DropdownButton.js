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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Util_1 = require("../util/Util");
var ConfigContext_1 = require("./ConfigContext");
var DropdownButton = /** @class */ (function (_super) {
    __extends(DropdownButton, _super);
    function DropdownButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropdownButton.prototype.render = function () {
        var _a = this.props, icon = _a.icon, altIcon = _a.altIcon, active = _a.active, text = _a.text, onClick = _a.onClick;
        var Icon = this.context.Icon;
        var iconToUse = icon;
        var iconClass = '';
        if (!Util_1.isNil(altIcon) && active !== undefined) {
            if (active) {
                iconClass = 'chonky-text-active';
            }
            else {
                iconToUse = altIcon;
                iconClass = 'chonky-text-subtle';
            }
        }
        var buttonProps = {};
        if (Util_1.isFunction(onClick))
            buttonProps.onClick = onClick;
        else
            buttonProps.disabled = true;
        return (React.createElement("button", __assign({ className: "chonky-dropdown-button" }, buttonProps),
            React.createElement("span", { className: iconClass },
                React.createElement(Icon, { icon: iconToUse, fixedWidth: true, size: "xs" })),
            "\u00A0",
            text));
    };
    DropdownButton.contextType = ConfigContext_1.ConfigContext;
    return DropdownButton;
}(React.Component));
exports.default = DropdownButton;
//# sourceMappingURL=DropdownButton.js.map