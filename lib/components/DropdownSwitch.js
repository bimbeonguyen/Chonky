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
var ConfigContext_1 = require("./ConfigContext");
var DropdownSwitch = /** @class */ (function (_super) {
    __extends(DropdownSwitch, _super);
    function DropdownSwitch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropdownSwitch.prototype.render = function () {
        var _a = this.props, activeId = _a.activeId, items = _a.items, onClick = _a.onClick;
        var Icon = this.context.Icon;
        var buttonComps = new Array(items.length);
        var _loop_1 = function (i) {
            var item = items[i];
            var itemProps = {
                className: classnames_1.default({
                    'chonky-dropdown-switch-button': true,
                    'chonky-tooltip': true,
                    'chonky-active': item.id === activeId,
                }),
                onClick: function () { return onClick(item.id); },
                'data-tooltip': item.tooltip,
            };
            buttonComps[i] = (React.createElement("button", __assign({ key: "view-switch-" + item.id }, itemProps),
                React.createElement(Icon, { icon: item.icon, fixedWidth: true })));
        };
        for (var i = 0; i < buttonComps.length; ++i) {
            _loop_1(i);
        }
        return React.createElement("div", { className: "chonky-dropdown-switch" }, buttonComps);
    };
    DropdownSwitch.contextType = ConfigContext_1.ConfigContext;
    return DropdownSwitch;
}(React.Component));
exports.default = DropdownSwitch;
//# sourceMappingURL=DropdownSwitch.js.map