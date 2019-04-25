import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { nativeLoginStart } from '../../../action-creators/authentication';
import { AuthenticationErrorCode } from '../../../constants/error_codes';
import { IAppState, IConnectedComponentProps } from '../../../store';
import Form from '../../Generics/Form';

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

class LoginFormContainer extends Form<ILoginFormData> { }
class LoginForm extends React.Component<ILoginFormProps> {

    private _handleSubmit = (formData: ILoginFormData) => {
        this.props.startLogin(formData);
    }

    public render() {

        const { error: { message: errorMessage } } = this.props;

        return <LoginFormContainer id={'LoginForm'} onSubmit={this._handleSubmit}>
            {({ onChange }) => (
                <div>
                    <fieldset>
                        <label className="loginForm--label" htmlFor="loginForm--input--email">
                            Email
                            <input
                                id="loginForm--input--email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="loginForm--label" htmlFor="loginForm--input--password">
                            Password
                            <input
                                id="loginForm--input--password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={onChange}
                                required
                            />
                        </label>
                    </fieldset>
                    <button type="submit">
                        Login
                    </button>
                    {errorMessage && <span style={{ color: 'red', display: 'block' }}>{errorMessage}</span>}
                </div>
            )}
        </LoginFormContainer>;
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
