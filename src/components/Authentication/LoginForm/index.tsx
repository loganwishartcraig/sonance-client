import { Field, Formik, FormikActions, Form } from 'formik';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToPropsParam } from 'react-redux';
import { nativeLoginStart } from '../../../action-creators/authentication';
import { appLogger } from '../../../services/Logger';
import { IAppState, IConnectedComponentProps } from '../../../store';

interface ILoginFormData {
    readonly email: string;
    readonly password: string;
}

interface ILoginFormStateProps {
    readonly loading: boolean;
    readonly error: {
        readonly code: string | void;
        readonly message: string | void;
    };
}

interface ILoginFormDispatchProps {
    readonly startLogin: typeof nativeLoginStart;
}

interface ILoginFormOwnProps { }

type ILoginFormProps = IConnectedComponentProps<ILoginFormStateProps, ILoginFormDispatchProps, ILoginFormOwnProps>;

class LoginForm extends React.Component<ILoginFormProps> {

    private _handleSubmit = (formConfig: ILoginFormData, formicActions: FormikActions<ILoginFormData>) => {
        appLogger.log({ message: 'Form data', meta: { formData: formConfig } });
        this.props.startLogin(formConfig);
    }

    public render() {

        const {
            loading,
            error: { message: errorMessage },
        } = this.props;

        return (
            <Formik<ILoginFormData>
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={this._handleSubmit}
            >
                <Form>
                    <fieldset>
                        <label className="loginForm--label" htmlFor="loginForm--input--email">
                            Email
                                <Field
                                id="loginForm--input--email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                disabled={loading}
                            />
                        </label>
                        <label className="loginForm--label" htmlFor="loginForm--input--password">
                            Password
                                <Field
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />
                        </label>
                    </fieldset>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            Login
                        </button>
                    </div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </Form>
            </Formik>
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
