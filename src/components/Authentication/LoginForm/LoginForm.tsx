import * as React from 'react';
import Form from '../../Generics/Form';
import Input from '../../Generics/Form/Input';
import { IFormGroupProps } from '../../Generics/Form/FormGroup/FormGroup';

const loginFormGroups: IFormGroupProps[] = [{
    className: 'LoginForm--FormGroup',
    id: 'LoginForm--FormGroup__username',
}, {
    className: 'LoginForm--FormGroup',
    id: 'LoginForm--FormGroup__password',
}];

const LoginForm: React.FunctionComponent = () => (

    <Form id="LoginForm" groups={loginFormGroups} />

);

export default LoginForm;
