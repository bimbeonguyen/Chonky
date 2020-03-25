/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { FileData, FileView, MultiFileActionHandler, Option, Options, Selection, SortOrder } from '../typedef';
import { ConfigContext } from './ConfigContext';
interface ControlsProps {
    folderChain?: (FileData | null)[];
    selection: Selection;
    onFileOpen?: (file: FileData) => void;
    onFolderCreate?: Nullable<() => void>;
    onUploadClick?: Nullable<() => void>;
    onDownloadFiles?: Nullable<MultiFileActionHandler>;
    onDeleteFiles?: Nullable<MultiFileActionHandler>;
    getFilesFromSelection: () => FileData[];
    view: FileView;
    setView: (view: FileView) => void;
    options: Options;
    setOption: (name: Option, value: boolean) => void;
    sortProperty: string | ((file: FileData) => any);
    sortOrder: SortOrder;
    activateSortProperty: (name: string | ((file: FileData) => any)) => void;
    AdditionalAction?: React.ReactElement;
}
interface ControlsState {
}
export default class Controls extends React.PureComponent<ControlsProps, ControlsState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    private renderFolderChain;
    private renderActionButtons;
    private renderSortDropdownButtons;
    private renderOptionsDropdownButtons;
    render(): JSX.Element;
}
export {};
