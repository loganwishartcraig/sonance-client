import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { AuthenticationErrorCode } from '../../../constants/error_codes';
import { IAppState, IConnectedComponentProps } from '../../../store';
import Form, { IFormValidators } from '../../Generics/Form';
import { registrationStart } from '../../../action-creators/authentication';

interface IRegistrationFormData {
    readonly email: string;
    readonly password: string;
    readonly passwordConfirmation: string;
    readonly nameFirst: string;
    readonly nameLast: string;
}

interface IRegistrationFormStateProps {
    readonly loading: boolean;
    readonly error: {
        readonly code: string | void;
        readonly message: string | void;
    };
}

interface IRegistrationFormDispatchProps {
    readonly startRegistration: typeof registrationStart;
}

type IRegistrationFormProps = IConnectedComponentProps<IRegistrationFormStateProps, IRegistrationFormDispatchProps, {}>;

const validators: IFormValidators<IRegistrationFormData> = {
    passwordConfirmation: (value, name, context) => value === context.password,
};

class RegistrationForm extends React.Component<IRegistrationFormProps> {

    private _handleSubmit = (formData: IRegistrationFormData) => {
        this.props.startRegistration(formData);
    }

    public render() {

        const { error: { message: errorMessage } } = this.props;

        return (
            <Form<IRegistrationFormData>
                id={'RegistrationForm'}
                initialValues={{
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    nameFirst: '',
                    nameLast: '',
                }}
                validators={validators}
                onSubmit={this._handleSubmit}
            >
                {({ onChange }) => (
                    <div>
                        <fieldset>
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                            <div>
                                <label className="regForm--label" htmlFor="regForm--input--passwordConfirmation">
                                    Retype Password
                            <input
                                        id="regForm--input--passwordConfirmation"
                                        name="passwordConfirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        onChange={onChange}
                                        required
                                    />
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                                <label className="regForm--label" htmlFor="regForm--input--fname">
                                    First Name
                            <input
                                        id="regForm--input--fname"
                                        name="nameFirst"
                                        type="text"
                                        autoComplete="given-name"
                                        onChange={onChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="regForm--label" htmlFor="regForm--input--lname">
                                    Last Name
                            <input
                                        id="regForm--input--lname"
                                        name="nameLast"
                                        type="text"
                                        autoComplete="family-name"
                                        onChange={onChange}
                                        required
                                    />
                                </label>
                            </div>
                        </fieldset>
                        <button type="submit">
                            Register
                    </button>
                        {errorMessage && <span style={{ color: 'red', display: 'block' }}>{errorMessage}</span>}
                    </div>
                )}
            </Form>
        );
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

export default connect(stateToProps, dispatchToProps)(RegistrationForm);
