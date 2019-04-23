import * as React from 'react';
import { appLogger } from '../../../services/Logger';

export interface IFormProps<FormDataShape extends Object> {
    readonly id?: string;
    readonly className?: string;
    readonly initialValues?: Partial<FormData>;
    readonly onSubmit: (formData: FormDataShape) => void;
    readonly children: (config: { onChange: (...args: any[]) => void }) => React.ReactNode;
}

interface IFormState<FormDataShape extends Object> {
    readonly values: FormDataShape;
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
            onSubmit(this.state.values);
        }

    }

    private _updateFormValueInState(name: string, value: any) {
        this.setState({
            ...this.state,
            values: {
                ...this.state.values,
                [name]: value,
            },
        });
    }

    private _parseInitialStateFromProps({
        initialValues = {},
    }: IFormProps<FormDataShape>): IFormState<FormDataShape> {
        return {
            values: JSON.parse(JSON.stringify(initialValues)),
        };
    }

    public render() {

        const { id, className, children } = this.props;

        return (
            <form id={id} className={className} onSubmit={this._handleSubmit}>
                {children({ onChange: this._handleInputChange })}
            </form>
        );

    }
}

export default Form;
