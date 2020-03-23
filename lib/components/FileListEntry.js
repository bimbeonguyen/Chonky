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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var react_if_1 = require("react-if");
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var typedef_1 = require("../typedef");
var FileUtil_1 = require("../util/FileUtil");
var ConsoleUtil_1 = __importDefault(require("../util/ConsoleUtil"));
var LoadingPlaceholder_1 = __importDefault(require("./LoadingPlaceholder"));
var IconUtil_1 = require("../util/IconUtil");
var ClickableWrapper_1 = __importDefault(require("./ClickableWrapper"));
var Util_1 = require("../util/Util");
var ConfigContext_1 = require("./ConfigContext");
var FileListEntry = /** @class */ (function (_super) {
    __extends(FileListEntry, _super);
    function FileListEntry(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            thumbnailUrl: null,
        };
        return _this;
    }
    FileListEntry.prototype.componentDidMount = function () {
        var onMount = this.props.onMount;
        if (Util_1.isFunction(onMount))
            onMount();
        this.requestThumbnail();
    };
    FileListEntry.prototype.requestThumbnail = function () {
        var _this = this;
        var _a = this.props, file = _a.file, thumbnailGenerator = _a.thumbnailGenerator;
        if (Util_1.isNil(file) || !Util_1.isFunction(thumbnailGenerator))
            return;
        Promise.resolve()
            .then(function () { return thumbnailGenerator(file); })
            .then(function (thumbnailUrl) { return _this.setState({ thumbnailUrl: thumbnailUrl }); })
            .catch(function (error) {
            ConsoleUtil_1.default.logUnhandledUserException(error, "loading thumbnail for \"" + file.name + "\"");
        });
    };
    FileListEntry.prototype.getIconData = function () {
        var file = this.props.file;
        var icons = this.context.icons;
        return IconUtil_1.getIconData(file, icons);
    };
    FileListEntry.prototype.renderFilename = function () {
        var _a = this.props, file = _a.file, view = _a.view;
        if (Util_1.isNil(file))
            return React.createElement(LoadingPlaceholder_1.default, null);
        var displayName = file.name;
        var displayExtension = '';
        if (Util_1.isString(file.ext))
            displayExtension = file.ext;
        else
            displayExtension = path_1.default.extname(file.name);
        var hasExtension = displayExtension.length !== 0;
        if (hasExtension)
            displayName = file.name.substr(0, file.name.length - displayExtension.length);
        var maxNameLength = Util_1.isMobileDevice() ? 80 : 150;
        var namePartLength = Math.floor((maxNameLength - 3) / 2);
        if (displayName.length > maxNameLength && view !== typedef_1.FileView.Details) {
            // TODO: Collapse file names in a nicer way - don't break up words, etc.
            displayName = (React.createElement("span", { title: displayName },
                displayName.substr(0, namePartLength).trimRight(),
                React.createElement("span", { className: "chonky-text-subtle-dark" }, "<...>"),
                displayName
                    .substr(displayName.length - namePartLength, namePartLength)
                    .trimRight()));
        }
        var _b = this.context, Icon = _b.Icon, icons = _b.icons;
        return (React.createElement(React.Fragment, null,
            React.createElement(react_if_1.When, { condition: file.isSymlink === true },
                React.createElement("span", { className: "chonky-text-subtle" },
                    React.createElement(Icon, { icon: icons.symlink, size: "xs" })),
                "\u00A0\u00A0"),
            React.createElement(react_if_1.When, { condition: file.isHidden === true },
                React.createElement("span", { className: "chonky-text-subtle" },
                    React.createElement(Icon, { icon: icons.hidden, size: "xs" })),
                "\u00A0\u00A0"),
            displayName,
            React.createElement(react_if_1.When, { condition: hasExtension },
                React.createElement("span", { className: "chonky-text-subtle-dark" }, displayExtension)),
            React.createElement(react_if_1.When, { condition: file.isDir === true },
                React.createElement("span", { className: "chonky-text-subtle", style: { marginLeft: 2 } }, "/"))));
    };
    FileListEntry.prototype.renderSize = function () {
        var file = this.props.file;
        if (Util_1.isNil(file))
            return React.createElement(LoadingPlaceholder_1.default, null);
        if (!Util_1.isNumber(file.size))
            return React.createElement("span", { className: "chonky-text-subtle" }, "\u2014");
        return FileUtil_1.FileUtil.readableSize(file.size);
    };
    FileListEntry.prototype.renderModDate = function () {
        var _a, _b;
        var _c = this.props, file = _c.file, showRelativeDates = _c.showRelativeDates;
        if (Util_1.isNil(file))
            return React.createElement(LoadingPlaceholder_1.default, null);
        if (!(file.modDate instanceof Date))
            return React.createElement("span", { className: "chonky-text-subtle" }, "\u2014");
        var relativeDate = FileUtil_1.FileUtil.relativeDate(file.modDate);
        var readableDate = FileUtil_1.FileUtil.readableDate(file.modDate);
        var displayDate;
        var tooltipDate;
        if (showRelativeDates) {
            _a = [relativeDate, readableDate], displayDate = _a[0], tooltipDate = _a[1];
        }
        else {
            _b = [readableDate, relativeDate], displayDate = _b[0], tooltipDate = _b[1];
        }
        return React.createElement("span", { title: tooltipDate }, displayDate);
    };
    FileListEntry.prototype.renderDetailsEntry = function () {
        var file = this.props.file;
        var Icon = this.context.Icon;
        var loading = Util_1.isNil(file);
        var iconData = this.getIconData();
        var iconProps = {
            style: loading ? {} : { color: typedef_1.ColorsDark[iconData.colorCode] },
            className: classnames_1.default({
                'chonky-file-list-entry-icon': true,
                'chonky-text-subtle-light': loading,
            }),
        };
        return [
            React.createElement("div", __assign({ key: "chonky-file-icon" }, iconProps),
                React.createElement(Icon, { icon: iconData.icon, fixedWidth: true, spin: loading })),
            React.createElement("div", { key: "chonky-file-name", className: "chonky-file-list-entry-name" }, this.renderFilename()),
            React.createElement("div", { key: "chonky-file-size", className: "chonky-file-list-entry-size" }, this.renderSize()),
            React.createElement("div", { key: "chonky-file-date", className: "chonky-file-list-entry-date" }, this.renderModDate()),
        ];
    };
    FileListEntry.prototype.renderThumbsEntry = function () {
        var file = this.props.file;
        var Icon = this.context.Icon;
        var thumbnailUrl = this.state.thumbnailUrl;
        var loading = Util_1.isNil(file);
        var hasThumbnail = Util_1.isString(thumbnailUrl);
        var iconData = this.getIconData();
        var iconProps = {
            className: classnames_1.default({
                'chonky-file-list-entry-icon': true,
                'chonky-text-subtle-light': loading,
                'chonky-icon-over-image': hasThumbnail,
            }),
        };
        var imageBgClassName = classnames_1.default({
            'chonky-file-list-entry-image-bg': true,
            'chonky-thumbnail-loaded': hasThumbnail,
        });
        var imageFgClassName = classnames_1.default({
            'chonky-file-list-entry-image-fg': true,
            'chonky-thumbnail-loaded': hasThumbnail,
        });
        var imageStyle = hasThumbnail
            ? { backgroundImage: "url('" + thumbnailUrl + "')" }
            : {};
        var BgColors = hasThumbnail ? typedef_1.ColorsDark : typedef_1.ColorsLight;
        return (React.createElement("div", { className: "chonky-file-list-entry-content", style: { backgroundColor: BgColors[iconData.colorCode] } },
            React.createElement("div", { className: "chonky-file-list-entry-thumb" },
                React.createElement("div", { className: "chonky-file-list-entry-background" }),
                React.createElement("div", { className: imageBgClassName, style: imageStyle }),
                React.createElement("div", { className: imageFgClassName, style: imageStyle }),
                React.createElement("div", { className: "chonky-file-list-entry-selection" }),
                React.createElement("div", __assign({}, iconProps),
                    React.createElement(Icon, { icon: iconData.icon, fixedWidth: true, spin: loading }),
                    !Util_1.isNil(file) && Util_1.isArray(file.childrenIds) && (React.createElement("div", { className: "chonky-file-list-entry-icon-inside" }, "" + file.childrenIds.length)))),
            React.createElement("div", { className: "chonky-file-list-entry-description" },
                React.createElement("div", { className: "chonky-file-list-entry-name" }, this.renderFilename()),
                React.createElement("div", { className: "chonky-file-list-entry-group" },
                    React.createElement("div", { className: "chonky-file-list-entry-size" }, this.renderSize()),
                    React.createElement("div", { className: "chonky-file-list-entry-date" }, this.renderModDate())))));
    };
    FileListEntry.prototype.render = function () {
        var _a = this.props, file = _a.file, style = _a.style, selected = _a.selected, displayIndex = _a.displayIndex, view = _a.view, doubleClickDelay = _a.doubleClickDelay, onFileSingleClick = _a.onFileSingleClick, onFileDoubleClick = _a.onFileDoubleClick;
        var wrapperProps = {
            wrapperTag: 'div',
            passthroughProps: {
                style: style,
                className: classnames_1.default({
                    'chonky-file-list-entry': true,
                    'chonky-selected': selected,
                }),
            },
            doubleClickDelay: doubleClickDelay,
        };
        if (Util_1.isObject(file)) {
            if (Util_1.isFunction(onFileSingleClick)) {
                wrapperProps.onSingleClick = function (event) {
                    return onFileSingleClick(file, displayIndex, event);
                };
            }
            if (Util_1.isFunction(onFileDoubleClick)) {
                wrapperProps.onDoubleClick = function (event) {
                    return onFileDoubleClick(file, displayIndex, event);
                };
            }
        }
        return (React.createElement(ClickableWrapper_1.default, __assign({}, wrapperProps),
            view === typedef_1.FileView.Details && this.renderDetailsEntry(),
            view !== typedef_1.FileView.Details && this.renderThumbsEntry()));
    };
    FileListEntry.contextType = ConfigContext_1.ConfigContext;
    return FileListEntry;
}(React.PureComponent));
exports.default = FileListEntry;
//# sourceMappingURL=FileListEntry.js.map