import * as React from 'react';
import { appLogger } from '../../../services/Logger';
import { Utilities, OrNullify } from '../../../utilities';

export type IFormControlValidator<FormDataShape extends {}> = (
    value: any,
    name: string,
    data: FormDataShape
) => boolean;

export type IFormValidators<FormDataShape extends {}> = {
    [name in keyof FormDataShape]?: IFormControlValidator<FormDataShape>
};

export interface IFormProps<FormDataShape extends {}> {
    readonly id?: string;
    readonly className?: string;
    readonly initialValues: OrNullify<FormDataShape>;
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

type IFormControls<FormDataShape extends {}> = {
    [name in keyof FormDataShape]: IFormControlState;
};

interface IFormState<FormDataShape extends {}> {
    readonly controls: IFormControls<FormDataShape>;
    readonly isValid: boolean;
}

class Form<FormDataShape extends { [key: string]: any }>
    extends React.Component<IFormProps<FormDataShape>, IFormState<FormDataShape>> {

    public state: IFormState<FormDataShape>;

    constructor(props: IFormProps<FormDataShape>) {
        super(props);
        this.state = this._parseInitialStateFromProps(props);
    }

    private _handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

        const name = target.getAttribute('name');
        const value = this._resolveInputValue(target);

        if (typeof name === 'string' && name) {
            this._updateFormValueInState(name, value);
        } else {
            appLogger.error({
                message: '[Form] - _handleInputChange() - Non/empty string `name` attribute value on target.',
            });
        }

    }

    private _resolveInputValue(target: HTMLInputElement): any {

        if (target.type === 'file') {
            return target.files;
        }

        return target.value;

    }

    private _handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit(this._resolveInputValueJson());
        }

    }

    private _resolveInputValueJson(): FormDataShape {

        // Deliberate usage of 'keys' instead of 'entries' to
        // avoid typing issue with '{}' empty object default.
        const controlNames = Object.keys(this.state.controls);

        return controlNames.reduce(
            (json: FormDataShape, controlName: string) => {
                json[controlName] = this.state.controls[controlName].value as any;
                return json;
            },
            {} as FormDataShape
        );

    }

    private _updateFormValueInState(name: string, value: any) {

        const nextControlsState: IFormControls<FormDataShape> = {
            ...this.state.controls,
            [name]: {
                value,
                valid: this._validateValue(name, value),
            },
        };

        const isValid = this._validateControls(nextControlsState);

        appLogger.log({
            message: 'setting state', meta: {
                isValid,
                controls: nextControlsState,
            },
        });
        this.setState({
            isValid,
            controls: nextControlsState,
        });

    }

    private _validateControls(controlsState: IFormControls<FormDataShape>): boolean {

        const controlsToCheck: IFormControlState[] = Object.values(controlsState);

        for (const { valid } of controlsToCheck) {
            if (!valid) return false;
        }

        return true;

    }

    private _parseInitialStateFromProps({
        initialValues,
    }: IFormProps<FormDataShape>): IFormState<FormDataShape> {

        const clonedInitialValues = Utilities.deepClone(initialValues);

        const controls: IFormControls<FormDataShape> = Object
            .entries(clonedInitialValues)
            .reduce(
                (controls, [name, initialValue]) => {

                    controls[name] = this._parseInitialControlState(name, initialValue);

                    return controls;

                },
                {} as IFormControls<FormDataShape>
            );

        const isValid = this._validateControls(controls);

        return {
            controls,
            isValid,
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
                {children({ controls, onChange: this._handleInputChange })}
            </form>
        );

    }
}

export default Form;
