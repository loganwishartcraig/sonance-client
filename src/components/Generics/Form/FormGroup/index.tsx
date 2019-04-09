import * as React from 'react';
import Input, { IInputProps } from '../Input';

export interface IFormGroupProps {
    readonly id: string;
    readonly legend?: string;
    readonly inputs: IInputProps[];
    readonly className?: string;
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
    id,
    inputs,
    legend,
    className,
}) => (

        <fieldset id={id} className={className}>

            {legend && <legend>{legend}</legend>}

            {inputs.map(input => (
                <Input key={input.id} {...input}></Input>
            ))}

        </fieldset>

    );

export default FormGroup;
