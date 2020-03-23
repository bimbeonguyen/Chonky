/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import React from 'react';
import { Nullable } from 'tsdef';
import { FileData, FileView, InternalClickHandler, Selection, ThumbnailGenerator } from '../typedef';
import { ConfigContext } from './ConfigContext';
interface FileListProps {
    files: Nullable<FileData>[];
    selection: Selection;
    doubleClickDelay: number;
    onFileSingleClick: InternalClickHandler;
    onFileDoubleClick: InternalClickHandler;
    thumbnailGenerator?: ThumbnailGenerator;
    showRelativeDates: boolean;
    fillParentContainer: boolean;
    view: FileView;
}
interface FileListState {
}
export default class FileList extends React.PureComponent<FileListProps, FileListState> {
    private readonly detailsMeasureCache;
    private lastDetailsRenderWidth?;
    private readonly thumbsGridRef;
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    constructor(props: FileListProps);
    componentDidUpdate(prevProps: Readonly<FileListProps>): void;
    private getColWidth;
    private getRowHeight;
    private entryRenderer;
    private noContentRenderer;
    render(): JSX.Element;
}
export {};
