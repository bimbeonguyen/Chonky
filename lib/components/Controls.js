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
var classnames_1 = __importDefault(require("classnames"));
var typedef_1 = require("../typedef");
var Dropdown_1 = __importDefault(require("./Dropdown"));
var IconButton_1 = __importDefault(require("./IconButton"));
var ButtonGroup_1 = __importDefault(require("./ButtonGroup"));
var ConsoleUtil_1 = __importDefault(require("../util/ConsoleUtil"));
var DropdownButton_1 = __importDefault(require("./DropdownButton"));
var DropdownSwitch_1 = __importDefault(require("./DropdownSwitch"));
var Util_1 = require("../util/Util");
var ConfigContext_1 = require("./ConfigContext");
var SortButtons = [
    [typedef_1.SortProperty.Name, 'Name'],
    [typedef_1.SortProperty.Size, 'Size'],
    [typedef_1.SortProperty.ModDate, 'Last change'],
];
var DropdownButtons = [
    [typedef_1.Option.ShowHidden, 'Show hidden files'],
    [typedef_1.Option.FoldersFirst, 'Show folders first'],
    [typedef_1.Option.ShowRelativeDates, 'Show relative dates'],
    [typedef_1.Option.DisableTextSelection, 'Disable text selection'],
];
var Controls = /** @class */ (function (_super) {
    __extends(Controls, _super);
    function Controls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controls.prototype.renderFolderChain = function () {
        var _a = this.props, folderChain = _a.folderChain, onFileOpen = _a.onFileOpen;
        var _b = this.context, Icon = _b.Icon, icons = _b.icons;
        if (Util_1.isNil(folderChain))
            return null;
        var comps = new Array(Math.max(0, folderChain.length * 2 - 1));
        var _loop_1 = function (i) {
            var folder = folderChain[i];
            var isLast = i === folderChain.length - 1;
            var j = i * 2;
            var compProps = {
                key: "folder-chain-entry-" + j,
                className: classnames_1.default({
                    'chonky-folder-chain-entry': true,
                    'chonky-loading': Util_1.isNil(folder),
                }),
            };
            if (!Util_1.isNil(folder) &&
                folder.openable !== false &&
                Util_1.isFunction(onFileOpen) &&
                !isLast) {
                compProps.onClick = function () { return onFileOpen(folder); };
            }
            var TagToUse = Util_1.isFunction(compProps.onClick) ? 'button' : 'div';
            comps[j] = (react_1.default.createElement(TagToUse, __assign({}, compProps),
                j === 0 && (react_1.default.createElement("span", { className: "chonky-text-subtle-dark" },
                    react_1.default.createElement(Icon, { icon: icons.folder }),
                    "\u00A0\u00A0")),
                react_1.default.createElement("span", { className: "chonky-folder-chain-entry-name" }, Util_1.isObject(folder) ? folder.name : 'Loading...')));
            if (!isLast) {
                comps[j + 1] = (react_1.default.createElement("div", { key: "folder-chain-separator-" + j, className: "chonky-folder-chain-separator" },
                    react_1.default.createElement(Icon, { icon: icons.angleRight, size: "xs" })));
            }
        };
        for (var i = 0; i < folderChain.length; ++i) {
            _loop_1(i);
        }
        return react_1.default.createElement("div", { className: "chonky-folder-chain" }, comps);
    };
    Controls.prototype.renderActionButtons = function () {
        var _a = this.props, selection = _a.selection, onFolderCreate = _a.onFolderCreate, onUploadClick = _a.onUploadClick, onDownloadFiles = _a.onDownloadFiles, onDeleteFiles = _a.onDeleteFiles, getFilesFromSelection = _a.getFilesFromSelection;
        var icons = this.context.icons;
        var selectionSize = 0;
        for (var key in selection) {
            if (selection[key] === true)
                selectionSize++;
        }
        var buttonData = [
            [icons.folderCreate, 'Create folder', onFolderCreate, false],
            [icons.upload, 'Upload files', onUploadClick, false],
            [icons.download, 'Download files', onDownloadFiles, true],
            [icons.trash, 'Delete files', onDeleteFiles, true],
        ];
        var buttons = new Array(buttonData.length);
        var _loop_2 = function (i) {
            var button = buttonData[i];
            var _a = button, iconData = _a[0], tooltip = _a[1], clickFunc = _a[2], isMulti = _a[3];
            if (clickFunc !== null && !Util_1.isFunction(clickFunc))
                return "continue";
            var buttonProps = {
                key: "controls-button-" + i,
                icon: iconData,
                tooltip: tooltip,
            };
            if (clickFunc !== null && (!isMulti || selectionSize > 0)) {
                buttonProps.onClick = function (event) {
                    if (isMulti)
                        clickFunc(getFilesFromSelection(), event);
                    else
                        clickFunc();
                    return true;
                };
            }
            buttons[i] = react_1.default.createElement(IconButton_1.default, __assign({}, buttonProps));
        };
        for (var i = 0; i < buttons.length; ++i) {
            _loop_2(i);
        }
        return buttons;
    };
    Controls.prototype.renderSortDropdownButtons = function () {
        var _a = this.props, sortProperty = _a.sortProperty, sortOrder = _a.sortOrder, activateSortProperty = _a.activateSortProperty;
        var icons = this.context.icons;
        var orderIcon = sortOrder === typedef_1.SortOrder.Asc ? icons.asc : icons.desc;
        var comps = new Array(SortButtons.length);
        var _loop_3 = function (i) {
            var _a = SortButtons[i], propName = _a[0], propTitle = _a[1];
            var isActive = sortProperty === propName;
            var onClick = function (event) {
                event.preventDefault();
                activateSortProperty(propName);
            };
            comps[i] = (react_1.default.createElement(DropdownButton_1.default, { key: "sort-button-" + i, icon: orderIcon, altIcon: icons.checkInactive, onClick: onClick, active: isActive, text: propTitle }));
        };
        for (var i = 0; i < comps.length; ++i) {
            _loop_3(i);
        }
        return comps;
    };
    Controls.prototype.renderOptionsDropdownButtons = function () {
        var _a = this.props, view = _a.view, setView = _a.setView, options = _a.options, setOption = _a.setOption;
        var icons = this.context.icons;
        var ViewButtons = [
            {
                id: typedef_1.FileView.Details,
                icon: icons.list,
                tooltip: 'Details',
            },
            {
                id: typedef_1.FileView.SmallThumbs,
                icon: icons.smallThumbnail,
                tooltip: 'Small thumbnails',
            },
            {
                id: typedef_1.FileView.LargeThumbs,
                icon: icons.largetThumbnail,
                tooltip: 'Large thumbnails',
            },
        ];
        var comps = new Array(DropdownButtons.length + 1);
        comps[0] = (react_1.default.createElement(DropdownSwitch_1.default, { key: 'dropdown-switch', activeId: view, items: ViewButtons, onClick: setView }));
        var i = 1;
        var _loop_4 = function (optionName, text) {
            var value = options[optionName];
            if (!Util_1.isBoolean(value)) {
                ConsoleUtil_1.default.warn("Expected boolean value for option " + optionName + ", got: " + value);
                return "continue";
            }
            var onClick = function (event) {
                event.preventDefault();
                setOption(optionName, !value);
            };
            comps[i] = (react_1.default.createElement(DropdownButton_1.default, { key: "option-" + optionName, icon: icons.checkActive, altIcon: icons.checkInactive, active: options[optionName], text: text, onClick: onClick }));
            i++;
        };
        for (var _i = 0, DropdownButtons_1 = DropdownButtons; _i < DropdownButtons_1.length; _i++) {
            var _b = DropdownButtons_1[_i], optionName = _b[0], text = _b[1];
            _loop_4(optionName, text);
        }
        return comps;
    };
    Controls.prototype.render = function () {
        var _a = this.props, folderChain = _a.folderChain, onFileOpen = _a.onFileOpen, AdditionalAction = _a.AdditionalAction, selection = _a.selection;
        var icons = this.context.icons;
        var parentDirButtonProps = {};
        if (Util_1.isFunction(onFileOpen)) {
            var parentFolder_1 = Util_1.getNonNil(folderChain, -2);
            if (!Util_1.isNil(parentFolder_1) && parentFolder_1.openable !== false) {
                parentDirButtonProps.onClick = function () { return onFileOpen(parentFolder_1); };
            }
        }
        return (react_1.default.createElement("div", { className: "chonky-controls" },
            react_1.default.createElement("div", { className: "chonky-side chonky-side-left" },
                react_1.default.createElement(ButtonGroup_1.default, null,
                    react_1.default.createElement(IconButton_1.default, __assign({ icon: icons.directoryUp }, parentDirButtonProps))),
                this.renderFolderChain()),
            react_1.default.createElement("div", { className: "chonky-side chonky-side-right" },
                AdditionalAction && Object.keys(selection).length > 0 && (react_1.default.createElement("div", { className: "chonky-side-inside chonky-side-inside-left" }, AdditionalAction)),
                react_1.default.createElement("div", { className: "chonky-side-inside chonky-side-inside-left" }, this.renderActionButtons()),
                react_1.default.createElement("div", { className: "chonky-side-inside chonky-side-inside-right" },
                    react_1.default.createElement(Dropdown_1.default, { title: "Sort by" }, this.renderSortDropdownButtons()),
                    react_1.default.createElement(Dropdown_1.default, { title: "Options" }, this.renderOptionsDropdownButtons())))));
    };
    Controls.contextType = ConfigContext_1.ConfigContext;
    return Controls;
}(react_1.default.PureComponent));
exports.default = Controls;
//# sourceMappingURL=Controls.js.map