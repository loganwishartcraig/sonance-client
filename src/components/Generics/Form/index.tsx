import * as React from 'react';
import FormGroup, { IFormGroupProps } from './FormGroup';

export interface IFormProps {
    readonly id: string;
    readonly groups: IFormGroupProps[];
    readonly onSubmit: (formData: { [name: string]: any }) => void;
}

class Form<P extends Object> extends React.Component<IFormProps> {

    private _getSerializedFormData(_evt: React.FormEvent<HTMLFormElement>): P {

        const serialized: any = {};
        const data = new FormData(_evt.target as HTMLFormElement);

        data.forEach((value, key) => serialized[key] = value);

        return serialized;
    }

    private _handleSubmit: (_evt: React.FormEvent<HTMLFormElement>) => void = (_evt) => {

        _evt.preventDefault();

        const formData = this._getSerializedFormData(_evt);

        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit(formData);
        }

    }

    public render() {

        const { id, groups = [] } = this.props;

        return (
            <form id={id} onSubmit={this._handleSubmit}>

                form!! {id}

                {groups.map(group => (
                    <FormGroup {...group} key={group.id}></FormGroup>
                ))}

                <button type="submit">submit</button>

            </form>
        );
    }

}

export default Form;
