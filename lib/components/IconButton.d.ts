/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2019
 * @license MIT
 */
import * as React from 'react';
import { InputListener } from '../typedef';
import { ConfigContext } from './ConfigContext';
interface IconButtonProps {
    icon: any;
    active?: boolean;
    tooltip?: string;
    onClick?: InputListener;
}
interface IconButtonState {
}
export default class IconButton extends React.PureComponent<IconButtonProps, IconButtonState> {
    static contextType: React.Context<import("./ConfigContext").ConfigValue>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        active: boolean;
    };
    render(): JSX.Element;
}
export {};
