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
var react_virtualized_1 = require("react-virtualized");
var FileListEntry_1 = __importDefault(require("./FileListEntry"));
var Util_1 = require("../util/Util");
var typedef_1 = require("../typedef");
var ConfigContext_1 = require("./ConfigContext");
var DefaultRowHeight = 35;
var DetailsRowParameters = {
    defaultHeight: DefaultRowHeight,
    minHeight: DefaultRowHeight,
    fixedWidth: true,
};
var determineThumbsSize = (function () {
    var SmallThumbsSize = { width: 200, height: 160 };
    var LargeThumbsSize = { width: 280, height: 220 };
    return function (view) {
        return view === typedef_1.FileView.LargeThumbs ? LargeThumbsSize : SmallThumbsSize;
    };
})();
var FileList = /** @class */ (function (_super) {
    __extends(FileList, _super);
    function FileList(props) {
        var _this = _super.call(this, props) || this;
        _this.getColWidth = function (index, columnCount, entrySize, gutterSize) {
            if (index === columnCount - 1)
                return entrySize.width;
            return entrySize.width + gutterSize;
        };
        _this.getRowHeight = function (index, rowCount, entrySize, gutterSize) {
            if (index === rowCount - 1)
                return entrySize.height;
            return entrySize.height + gutterSize;
        };
        _this.entryRenderer = function (virtualKey, index, style, parent, gutterSize, lastRow, lastColumn) {
            var _a = _this.props, files = _a.files, selection = _a.selection, doubleClickDelay = _a.doubleClickDelay, onFileSingleClick = _a.onFileSingleClick, onFileDoubleClick = _a.onFileDoubleClick, thumbnailGenerator = _a.thumbnailGenerator, showRelativeDates = _a.showRelativeDates, view = _a.view;
            if (Util_1.isNumber(gutterSize)) {
                if (lastRow !== true)
                    style.height = style.height - gutterSize;
                if (lastColumn !== true)
                    style.width = style.width - gutterSize;
            }
            if (index >= files.length)
                return null;
            var file = files[index];
            var key = Util_1.isObject(file) ? file.id : "loading-file-" + virtualKey;
            var selected = Util_1.isObject(file) ? selection[file.id] === true : false;
            var entryProps = {
                file: file,
                style: style,
                selected: selected,
                displayIndex: index,
                doubleClickDelay: doubleClickDelay,
                onFileSingleClick: onFileSingleClick,
                onFileDoubleClick: onFileDoubleClick,
                thumbnailGenerator: thumbnailGenerator,
                showRelativeDates: showRelativeDates,
                view: view,
            };
            if (view === typedef_1.FileView.Details) {
                return (react_1.default.createElement(react_virtualized_1.CellMeasurer, { key: key, parent: parent, rowIndex: index, columnIndex: 0, cache: _this.detailsMeasureCache }, function (_a) {
                    var measure = _a.measure;
                    return (react_1.default.createElement(FileListEntry_1.default, __assign({ key: key, onMount: measure }, entryProps)));
                }));
            }
            return react_1.default.createElement(FileListEntry_1.default, __assign({ key: key }, entryProps));
        };
        _this.noContentRenderer = function (height) {
            var placeholderProps = {
                className: classnames_1.default({
                    'chonky-file-list-notification': true,
                    'chonky-file-list-notification-empty': true,
                }),
            };
            if (Util_1.isNumber(height))
                placeholderProps.style = { height: height };
            var _a = _this.context, Icon = _a.Icon, icons = _a.icons;
            return (react_1.default.createElement("div", __assign({}, placeholderProps),
                react_1.default.createElement("div", { className: "chonky-file-list-notification-content" },
                    react_1.default.createElement(Icon, { icon: icons.folderOpen }),
                    "\u00A0 Nothing to show")));
        };
        _this.detailsMeasureCache = new react_virtualized_1.CellMeasurerCache(DetailsRowParameters);
        _this.thumbsGridRef = react_1.default.createRef();
        return _this;
    }
    FileList.prototype.componentDidUpdate = function (prevProps) {
        var oldView = prevProps.view;
        var view = this.props.view;
        if (view !== oldView) {
            // @ts-ignore
            var current = this.thumbsGridRef.current;
            if (!Util_1.isNil(current)) {
                current.recomputeGridSize();
            }
        }
    };
    FileList.prototype.render = function () {
        var _this = this;
        var _a = this.props, files = _a.files, fillParentContainer = _a.fillParentContainer, view = _a.view;
        var isThumbs = view === typedef_1.FileView.SmallThumbs || view === typedef_1.FileView.LargeThumbs;
        var className = classnames_1.default({
            'chonky-file-list': true,
            'chonky-file-list-thumbs': isThumbs,
            'chonky-file-list-thumbs-small': isThumbs && view === typedef_1.FileView.SmallThumbs,
            'chonky-file-list-thumbs-large': isThumbs && view === typedef_1.FileView.LargeThumbs,
            'chonky-file-list-details': !isThumbs,
        });
        var autoSizerProps = {};
        if (!fillParentContainer)
            autoSizerProps.disableHeight = true;
        return (react_1.default.createElement("div", { className: className },
            react_1.default.createElement(react_virtualized_1.AutoSizer, __assign({}, autoSizerProps), function (_a) {
                var width = _a.width, height = _a.height;
                var rowCount;
                if (view === typedef_1.FileView.Details) {
                    if (_this.lastDetailsRenderWidth !== width) {
                        _this.lastDetailsRenderWidth = width;
                        _this.detailsMeasureCache.clearAll();
                    }
                    rowCount = files.length;
                    return (react_1.default.createElement(react_virtualized_1.List, { rowRenderer: function (data) {
                            return _this.entryRenderer(data.key, data.index, data.style, data.parent);
                        }, noRowsRenderer: function () {
                            return _this.noContentRenderer(DefaultRowHeight);
                        }, deferredMeasurementCache: _this.detailsMeasureCache, rowCount: rowCount, rowHeight: _this.detailsMeasureCache.rowHeight, width: width, height: Util_1.isNil(height) ? 500 : height, autoHeight: !fillParentContainer, tabIndex: null }));
                }
                var columnCount;
                var entrySize = determineThumbsSize(view);
                var isMobile = Util_1.isMobileDevice();
                var gutter = isMobile ? 5 : 10;
                var scrollbar = !fillParentContainer || isMobile ? 0 : 16;
                var isLargeThumbs = view === typedef_1.FileView.LargeThumbs;
                if (isMobile && width < 400) {
                    // Hardcode column count on mobile
                    columnCount = isLargeThumbs ? 2 : 3;
                    entrySize = {
                        width: Math.floor((width - gutter * (columnCount - 1)) / columnCount),
                        height: isLargeThumbs ? 160 : 120,
                    };
                }
                else {
                    var columnCountFloat = (width + gutter - scrollbar) / (entrySize.width + gutter);
                    columnCount = Math.max(1, Math.floor(columnCountFloat));
                }
                rowCount = Math.ceil(files.length / columnCount);
                return (react_1.default.createElement(react_virtualized_1.Grid, { ref: _this.thumbsGridRef, cellRenderer: function (data) {
                        var index = data.rowIndex * columnCount + data.columnIndex;
                        return _this.entryRenderer(data.key, index, __assign({}, data.style), data.parent, gutter, data.rowIndex === rowCount - 1, data.columnIndex === columnCount - 1);
                    }, noContentRenderer: function () {
                        return _this.noContentRenderer(entrySize.height);
                    }, rowCount: rowCount, columnCount: columnCount, columnWidth: function (_a) {
                        var index = _a.index;
                        return _this.getColWidth(index, columnCount, entrySize, gutter);
                    }, rowHeight: function (_a) {
                        var index = _a.index;
                        return _this.getRowHeight(index, rowCount, entrySize, gutter);
                    }, width: width, height: Util_1.isNil(height) ? 500 : height, autoHeight: !fillParentContainer, tabIndex: null }));
            })));
    };
    FileList.contextType = ConfigContext_1.ConfigContext;
    return FileList;
}(react_1.default.PureComponent));
exports.default = FileList;
//# sourceMappingURL=FileList.js.map