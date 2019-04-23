import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { AuthenticationErrorCode } from '../../../constants/error_codes';
import { IAppState, IConnectedComponent as IConnectedComponentProps } from '../../../store';
import Form from '../../Generics/Form';
import { registrationStart } from '../../../action-creators/authentication';

interface IRegistrationFormData {
    readonly email: string;
    readonly password: string;
    readonly passwordConfirmation: string;
    readonly firstName: string;
    readonly lastName: string;
}

interface IRegistrationFormStateProps {
    readonly loading: boolean;
    readonly error: {
        readonly code: AuthenticationErrorCode | void;
        readonly message: string | void;
    };
}

interface IRegistrationFormDispatchProps {
    readonly startRegistration: typeof registrationStart;
}

type IRegistrationFormProps = IConnectedComponentProps<IRegistrationFormStateProps, IRegistrationFormDispatchProps, {}>;

class RegistrationFormContainer extends Form<IRegistrationFormData> { }
class LoginForm extends React.Component<IRegistrationFormProps> {

    private _handleSubmit = (formData: IRegistrationFormData) => {
        this.props.startRegistration(formData);
    }

    public render() {
        return <RegistrationFormContainer id={'LoginForm'} onSubmit={this._handleSubmit}>
            {({ onChange }) => (
                <div>
                    <fieldset>
                        <label className="regForm--label" htmlFor="regForm--input--email">
                            Email
                            <input
                                id="regForm--input--email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="regForm--label" htmlFor="regForm--input--password">
                            Password
                            <input
                                id="regForm--input--password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                onChange={onChange}
                                required
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label className="regForm--label" htmlFor="regForm--input--fname">
                            First Name
                            <input
                                id="regForm--input--fname"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label className="regForm--label" htmlFor="regForm--input--lname">
                            Last Name
                            <input
                                id="regForm--input--lname"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                onChange={onChange}
                                required
                            />
                        </label>
                    </fieldset>
                    <button type="submit">
                        Register
                    </button>
                </div>
            )}
        </RegistrationFormContainer>;
    }

}

const stateToProps: MapStateToPropsParam<
    IRegistrationFormStateProps,
    {},
    IAppState
> = ({ authentication: { loading, error: { code, message } } }) => ({
    loading,
    error: {
        code,
        message,
    },
});

const dispatchToProps: MapDispatchToProps<
    IRegistrationFormDispatchProps,
    {}
> = {
    startRegistration: registrationStart,
};

export default connect(stateToProps, dispatchToProps)(LoginForm);
