import * as React from 'react';
import { connect, MapStateToPropsParam, MapDispatchToProps } from 'react-redux';
import Form from '../../Generics/Form';
import { IFormGroupProps } from '../../Generics/Form/FormGroup';
import { nativeLoginStart } from '../../../action-creators/authentication';
import { IAppState, IConnectedComponent as IConnectedComponentProps } from '../../../store';
import { AuthenticationErrorCode } from '../../../constants/error_codes';

const loginFormGroups: IFormGroupProps[] = [{
    className: 'LoginForm--FormGroup',
    id: 'LoginForm--FormGroup__email',
    inputs: [{
        id: 'LoginForm--Input__email',
        name: 'email',
        type: 'email',
        label: {
            id: 'LoginForm--Label__email',
            text: 'Email',
        },
    }],
}, {
    className: 'LoginForm--FormGroup',
    id: 'LoginForm--FormGroup__password',
    inputs: [{
        id: 'LoginForm--Input__password',
        name: 'password',
        type: 'password',
        label: {
            id: 'LoginForm--Label__password',
            text: 'Password',
        },
    }],
}];

interface ILoginFormData {
    readonly email: string;
    readonly password: string;
}

interface ILoginFormStateProps {
    readonly loading: boolean;
    readonly error: {
        readonly code: AuthenticationErrorCode | void;
        readonly message: string | void;
    };
}

interface ILoginFormDispatchProps {
    readonly startLogin: typeof nativeLoginStart;
}

interface ILoginFormOwnProps { }

type ILoginFormProps = IConnectedComponentProps<ILoginFormStateProps, ILoginFormDispatchProps, ILoginFormOwnProps>;
class LoginForm extends React.Component<ILoginFormProps> {

    private _handleSubmit = (formData: any) => {
        this.props.startLogin(formData);
    }

    public render() {

        const {
            error: { message: errMessage },
            loading,
        } = this.props;

        return (

            <div>
                <Form id="LoginForm" groups={loginFormGroups} onSubmit={this._handleSubmit} />
                {loading && <span>Loading...</span>}
                {errMessage && <span style={{ color: 'red' }}>{errMessage}</span>}
            </div>

        );
    }

}

const stateToProps: MapStateToPropsParam<
    ILoginFormStateProps,
    ILoginFormOwnProps,
    IAppState
> = ({ authentication: { loading, error: { code, message } } }) => ({
    loading,
    error: {
        code,
        message,
    },
});

const dispatchToProps: MapDispatchToProps<
    ILoginFormDispatchProps,
    ILoginFormOwnProps
> = {
    startLogin: nativeLoginStart,
};

export default connect(stateToProps, dispatchToProps)(LoginForm);
