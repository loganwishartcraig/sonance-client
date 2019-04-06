import * as React from 'react';

export interface IInputProps {
    readonly id: string;
    readonly initialValue?: any;
    readonly type: 'text' | 'radio' | 'checkbox' | 'password' | 'number' | 'email';
    readonly required?: boolean;
    readonly onChange?: (x: any) => void;
}

export interface IInputState {
    readonly value: any;
}

class Input extends React.Component<IInputProps, IInputState> {

    constructor(props: IInputProps) {

        super(props);

        this.state = {
            value: this.props.initialValue,
        };

    }

    private _handleChange = ({ target: { value } }: { target: HTMLInputElement }) => {

        this.setState({ value });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }

    }

    public render() {

        const { value } = this.state;

        const {
            id,
            type,
            required = false,
        } = this.props;

        return (
            <input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={this._handleChange}
            ></input>
        );
    }

}

export default Input;
