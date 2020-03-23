/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import * as React from 'react';
import { ConfigContext } from './ConfigContext';
interface DropdownProps {
    title: string;
    active?: boolean;
}
interface DropdownState {
}
export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        title: string;
        active: boolean;
    };
    constructor(props: DropdownProps);
    render(): JSX.Element;
}
export {};
