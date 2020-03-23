/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import React from 'react';
import { InputListener } from '../typedef';
export interface ClickableWrapperProps {
    wrapperTag: any;
    passthroughProps?: any;
    doubleClickDelay: number;
    onSingleClick?: InputListener;
    onDoubleClick?: InputListener;
    onAllClicks?: InputListener;
}
export default class ClickableWrapper extends React.Component<ClickableWrapperProps, {}> {
    private clickTimeout?;
    private clickCount;
    constructor(props: ClickableWrapperProps);
    private handleClick;
    private handleKeyDown;
    render(): JSX.Element;
}
