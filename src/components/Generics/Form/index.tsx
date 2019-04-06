import * as React from 'react';
import FormGroup, { IFormGroupProps } from './FormGroup/FormGroup';

export interface IFormProps {
    readonly id: string;
    readonly groups: IFormGroupProps[];
}

const Form: React.FunctionComponent<IFormProps> = ({ id, groups = [] }) => (
    <form id={id} >

        form!! {id}

        {groups.map(group => (
            <FormGroup {...group} key={group.id}></FormGroup>
        ))}

        <button type="submit">submit</button>

    </form>
);

export default Form;
