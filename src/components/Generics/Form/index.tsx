import * as React from 'react';
import { appLogger } from '../../../services/Logger';
import { Utilities } from '../../../utilities';

export type IFormControlValidator<FormDataShape extends Object> = (
    value: string,
    name: string,
    data: FormDataShape
) => boolean;

export type IFormValidators<FormDataShape extends Object> = {
    [name in keyof FormDataShape]?: IFormControlValidator<FormDataShape>
};

export interface IFormProps<FormDataShape extends Object> {
    readonly id?: string;
    readonly className?: string;
    readonly initialValues?: Partial<FormData>;
    readonly validators?: IFormValidators<FormDataShape>;
    readonly onSubmit: (formData: FormDataShape) => void;
    readonly children: (config: {
        onChange: (...args: any[]) => void,
        controls: IFormControls<FormDataShape>
    }) => React.ReactNode;
}

interface IFormControlState {
    readonly value: any;
    readonly valid: boolean;
}

type IFormControls<FormDataShape extends Object> = {
    [name in keyof FormDataShape]: IFormControlState;
};

interface IFormState<FormDataShape extends Object> {
    readonly controls: IFormControls<FormDataShape>;
}

class Form<FormDataShape extends Object> extends React.Component<IFormProps<FormDataShape>, IFormState<FormDataShape>> {

    public state: IFormState<FormDataShape>;

    constructor(props: IFormProps<FormDataShape>) {
        super(props);
        this.state = this._parseInitialStateFromProps(props);
    }

    private _handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        const name = target.getAttribute('name');

        if (typeof name === 'string' && name) {
            this._updateFormValueInState(name, target.value);
        } else {
            appLogger.error({
                message: '[Form] - _handleInputChange() - Non/empty string `name` attribute value on target.',
            });
        }

    }

    private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit(this._resolveInputValueJson());
        }

    }

    private _resolveInputValueJson(): FormDataShape {
        return Object.entries(this.state.controls).reduce((json: FormDataShape, [name, { value }]) => {
            json[name as keyof FormDataShape] = value;
            return json;
        }, {} as FormDataShape);
    }

    private _updateFormValueInState(name: string, value: any) {

        this.setState({
            controls: {
                ...this.state.controls,
                [name]: {
                    value,
                    valid: this._validateValue(name, value),
                },
            },
        });

        setTimeout(
            () => console.warn('updated state', name, value, this.state)
            , 0
        );
    }

    private _parseInitialStateFromProps({
        initialValues = {},
    }: IFormProps<FormDataShape>): IFormState<FormDataShape> {

        const clonedInitialValues = Utilities.deepClone(initialValues);

        return {
            controls: Object.entries(clonedInitialValues).reduce((controls, [name, initialValue]) => {

                controls[
                    name as keyof IFormControls<FormDataShape>
                ] = this._parseInitialControlState(name, initialValue);

                return controls;

            }, {} as IFormControls<FormDataShape>),
        };
    }

    private _parseInitialControlState(
        name: string,
        initialValue: any
    ): IFormControlState {
        return {
            valid: this._validateValue(name, initialValue),
            value: initialValue,
        };
    }

    private _validateValue(name: string, value: any): boolean {

        const { validators = {} as IFormValidators<FormDataShape> } = this.props;
        const controlValidator = validators[name as keyof IFormValidators<FormDataShape>];

        if (typeof controlValidator !== 'function') {
            return true;
        }

        return controlValidator(value, name, this._resolveInputValueJson());

    }

    public render() {

        const { id, className, children } = this.props;
        const { controls } = this.state;

        return (
            <form id={id} className={className} onSubmit={this._handleSubmit}>
                {children({ onChange: this._handleInputChange, controls })}
            </form>
        );

    }
}

export default Form;
