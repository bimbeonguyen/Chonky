/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import * as React from 'react';
import { Nilable, Nullable } from 'tsdef';
import { FileData, FileView, InternalClickHandler, ThumbnailGenerator } from '../typedef';
import { ConfigContext } from './ConfigContext';
export interface FileListEntryProps {
    file: Nullable<FileData>;
    style: any;
    selected: boolean;
    displayIndex: number;
    doubleClickDelay: number;
    onFileSingleClick: InternalClickHandler;
    onFileDoubleClick: InternalClickHandler;
    thumbnailGenerator?: ThumbnailGenerator;
    showRelativeDates: boolean;
    view: FileView;
    onMount?: () => void;
}
interface FileListEntryState {
    thumbnailUrl: Nilable<string>;
}
export default class FileListEntry extends React.PureComponent<FileListEntryProps, FileListEntryState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    constructor(props: FileListEntryProps);
    componentDidMount(): void;
    private requestThumbnail;
    private getIconData;
    private renderFilename;
    private renderSize;
    private renderModDate;
    private renderDetailsEntry;
    private renderThumbsEntry;
    render(): JSX.Element;
}
export {};
