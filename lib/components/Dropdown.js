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
var ConfigContext_1 = require("./ConfigContext");
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        return _super.call(this, props) || this;
    }
    Dropdown.prototype.render = function () {
        var _a = this.props, children = _a.children, title = _a.title, active = _a.active;
        var _b = this.context, Icon = _b.Icon, icons = _b.icons;
        var className = classnames_1.default({
            'chonky-dropdown': true,
            'chonky-active': active,
        });
        return (React.createElement("div", { className: className },
            React.createElement("button", { className: "chonky-icon-button" },
                React.createElement("span", null,
                    title,
                    "\u00A0\u00A0",
                    React.createElement(Icon, { icon: icons.angleDown, size: "xs", style: { verticalAlign: 'top', marginTop: '0.7em' } }))),
            React.createElement("div", { className: "chonky-dropdown-contents-wrapper" },
                React.createElement("div", { className: "chonky-dropdown-contents" }, children))));
    };
    Dropdown.contextType = ConfigContext_1.ConfigContext;
    Dropdown.defaultProps = {
        title: 'Dropdown',
        active: false,
    };
    return Dropdown;
}(React.Component));
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map