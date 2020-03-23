/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import * as React from 'react';
import { ConfigContext } from './ConfigContext';
interface DropdownButtonProps {
    icon: any;
    altIcon?: any;
    active: boolean;
    text: string;
    onClick?: (event: any) => void;
}
interface DropdownButtonState {
}
export default class DropdownButton extends React.Component<DropdownButtonProps, DropdownButtonState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    render(): JSX.Element;
}
export {};
