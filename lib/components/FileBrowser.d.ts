/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { FileArray, FileData, FileIndexMap, FileView, InputEvent, MultiFileActionHandler, Option, Options, Selection, SingleFileActionHandler, SortOrder, SortProperty, ThumbnailGenerator } from '../typedef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons as defaultIcons } from './Icon';
export interface FileBrowserProps {
    /**
     * List of files that will be displayed in the main container. The provided value **must** be an array, where
     * each element is either `null` or an object that satisfies the `FileData` type. If an element is `null`, a
     * loading placeholder will be displayed in its place.
     * [See relevant section](#section-passing-files-to-chonky).
     */
    files: Nullable<FileData>[];
    /**
     * The current folder hierarchy. This should be an array to `files`, every element should either be `null` or an
     * object of `FileData` type. The first element should represent the top-level directory, and the last element
     * should be the current folder.
     * [See relevant section](#section-specifying-current-folder).
     */
    folderChain?: Nullable<FileData>[];
    /**
     * The function that determines the thumbnail image URL for a file. It gets a file object as the input, and
     * should return a `string` or `null`. It can also return a promise that resolves into a `string` or `null`.
     * [See relevant section](#section-displaying-file-thumbnails).
     */
    thumbnailGenerator?: ThumbnailGenerator;
    /**
     * The function that is called whenever the user tries to open a file. This behaviour can be triggered via a
     * double-click on a file in the main container, or by clicking on the name of a folder in the top bar.
     * [See relevant section](#section-handling-file-actions).
     */
    onFileOpen?: SingleFileActionHandler;
    /**
     * A callback that is called when user clicks on the "Create Folder" button in the control panel. If this
     * callback is not provided, the button will be hidden. If you want the button to be displayed in disabled mode,
     * pass `null` as the value.
     */
    onFolderCreate?: Nullable<() => void>;
    /**
     * A callback that is called when user clicks on the "Upload Files" button in the control panel. If this
     * callback is not provided, the button will be hidden. If you want the button to be displayed in disabled mode,
     * pass `null` as the value.
     */
    onUploadClick?: Nullable<() => void>;
    /**
     * This function is similar to `onFileOpen`, except the first argument is an array of files. The array will have
     * more than one element if the user makes a file selection containing multiple files, and then double-clicks on
     * one of the files.
     * [See relevant section](#section-handling-file-actions).
     */
    onOpenFiles?: MultiFileActionHandler;
    onMoveFiles?: MultiFileActionHandler;
    onDownloadFiles?: Nullable<MultiFileActionHandler>;
    onDeleteFiles?: Nullable<MultiFileActionHandler>;
    /**
     * The function that is called whenever a file entry in the main `FileBrowser` container is clicked once. If it
     * returns `true` (or a promise that resolves into `true`), the default Chonky behaviour will be cancelled.
     * [See relevant section](#section-handling-file-actions).
     */
    onFileSingleClick?: SingleFileActionHandler;
    /**
     * The function that is called whenever a file entry in the main `FileBrowser` container is double-clicked. If it
     * returns `true` (or a promise that resolves into `true`), the default Chonky behaviour will be cancelled.
     * [See relevant section](#section-handling-file-actions).
     */
    onFileDoubleClick?: SingleFileActionHandler;
    /**
     * Maximum delay between the two clicks in a double click, in milliseconds.
     */
    doubleClickDelay?: number;
    /**
     * The function that is called whenever file selection changes.
     * [See relevant section](#section-managing-file-selection).
     */
    onSelectionChange?: (selection: Selection) => void;
    /**
     * The flag that completely disables file selection functionality. If any handlers depend on file selections, their
     * input will look like no files are selected.
     * [See relevant section](#section-managing-file-selection).
     */
    disableSelection?: boolean;
    /**
     * The flag that determines whether Chonky should fill the height parent container. When set to `true`, the maximum
     * height of the file browser will be limited to the height of the parent container, and scrollbar will be shown
     * when necessary. When set to `false`, file browser height will be extended to display all files at the same time.
     */
    fillParentContainer?: boolean;
    /**
     * The initial file view. This should be set using the `FileView` enum. Users can change file view using the
     * controls in the top bar.
     * [See relevant section](#section-setting-file-browser-options).
     */
    view?: FileView;
    /**
     * Initial values for the file view options. Users can toggle all of these using the "Options" dropdown.
     * [See relevant section](#section-setting-file-browser-options).
     */
    options?: Partial<Options>;
    /**
     * The file object property that files are initially sorted by. This can be a string corresponding to one of the
     * file properties, or a function that takes in a `FileData` object and returns some value. This should can be set
     * using the `SortProperty` enum. Users can change the sort property by clicking on column names in detailed view.
     * [See relevant section](#section-setting-file-browser-options).
     */
    sortProperty?: string | ((file: FileData) => any);
    /**
     * The order in which the files are presented. This should be set using the `SortOrder` enum. Users can change the
     * sort order by clicking on column names in detailed view.
     * [See relevant section](#section-setting-file-browser-options).
     */
    sortOrder?: SortOrder;
    /**
     * Icon component
     */
    Icon?: typeof FontAwesomeIcon;
    /**
     * Map of default icons
     */
    icons: Partial<typeof defaultIcons>;
    onSort: (sortProperty: SortProperty, sortOrder: SortOrder) => void;
}
interface FileBrowserState {
    rawFiles: FileArray;
    folderChain?: FileArray;
    sortedFiles: FileArray;
    fileIndexMap: FileIndexMap;
    previousSelectionIndex?: number;
    selection: Selection;
    view: FileView;
    options: Options;
    sortProperty: string | ((file: FileData) => any);
    sortOrder: SortOrder;
}
/**
 * File browser component.
 */
export default class FileBrowser extends React.Component<FileBrowserProps, FileBrowserState> {
    static defaultProps: Partial<FileBrowserProps>;
    private readonly ref;
    private selectedFilesSnapshotBeforeSingleClick;
    constructor(props: FileBrowserProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<FileBrowserProps>): void;
    componentDidUpdate(prevProps: Readonly<FileBrowserProps>, prevState: Readonly<FileBrowserState>): void;
    protected setView: (view: FileView) => void;
    protected setOption: (name: Option, value: boolean) => void;
    protected activateSortProperty: (name: SortProperty) => void;
    private handleSelectionToggle;
    /**
     * The method that returns the current file selection. The return value is an object where each key
     * represents a file ID, and value of `true` indicates that the object should be selected. This object is read-only.
     * [See relevant section](#section-managing-file-selection).
     * @public
     */
    getSelection(): Selection;
    /**
     * A method that can be used to set the current file selection. The input should be an object where each key
     * represents a file ID, and value of `true` indicates that the object should be selected.
     * [See relevant section](#section-managing-file-selection).
     * @public
     */
    setSelection(selection: Selection): void;
    isInViewport(inputEvent: InputEvent, offset?: number): boolean;
    getFilesFromSelection: (customSelection?: Selection | undefined) => any[];
    private handleKeyPress;
    private handleFileSingleClick;
    private handleFileDoubleClick;
    render(): JSX.Element;
}
export {};
