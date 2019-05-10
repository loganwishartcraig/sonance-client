import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { AuthenticationErrorCode } from '../../../constants/error_codes';
import { IAppState, IConnectedComponentProps } from '../../../store';
import { registrationStart } from '../../../action-creators/authentication';
import { Formik, Field, Form } from 'formik';

interface IRegistrationFormData {
    readonly email: string;
    readonly password: string;
    readonly passwordConf: string;
    readonly firstName: string;
    readonly lastName: string;
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

class RegistrationForm extends React.Component<IRegistrationFormProps> {

    private _handleSubmit = (formData: IRegistrationFormData) => {
        this.props.startRegistration(formData);
    }

    public render() {

        const { error: { message: errorMessage }, loading } = this.props;

        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    passwordConf: '',
                    firstName: '',
                    lastName: '',
                }}
                onSubmit={this._handleSubmit}
            >
                <Form>
                    <fieldset>
                        <legend>Account Information</legend>
                        <div>
                            <label htmlFor="regForm--input--email">
                                Email
                                <Field
                                    id="regForm--input--email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="regForm--input--password">
                                Password
                                <Field
                                    id="regForm--input--password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="regForm--input--passwordConf">
                                Confirm Password
                                    <Field
                                    id="regForm--input--passwordConf"
                                    type="password"
                                    name="passwordConf"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    required
                                />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Personal Info</legend>
                        <div>
                            <label htmlFor="regForm--input--firstName">
                                First Name
                                    <Field
                                    id="regForm--input--firstName"
                                    type="text"
                                    name="firstName"
                                    autoComplete="given-name"
                                    disabled={loading}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="regForm--input--lastName">
                                Last Name
                                    <Field
                                    id="regForm--input--lastName"
                                    type="text"
                                    name="lastName"
                                    autoComplete="family-name"
                                    disabled={loading}
                                    required
                                />
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            Submit
                        </button>
                    </div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </Form>
            </Formik>
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

export default connect(stateToProps, dispatchToProps)(RegistrationForm);;
