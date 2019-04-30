import * as React from 'react';
import LoginPage from '../../../pages/Login';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from '../../App';
import RegisterPage from '../../../pages/Register';
import PrivateRoute from '../PrivateRoute';
import RedirectHome from '../RedirectHome';

const RouteManager: React.FunctionComponent = () => (
    <Router>

        <Link to="/login">Login</Link><br />
        <Link to="/register">Register</Link><br />

        <Switch>
            <PrivateRoute
                path="/"
                exact
                component={App}
                noAuthComponent={LoginPage}
            ></PrivateRoute>

            <PrivateRoute
                path="/login"
                exact
                noAuthComponent={LoginPage}
                render={() => <RedirectHome currentLocation="/login" />}
            />

            <PrivateRoute
                path="/register"
                exact
                noAuthComponent={RegisterPage}
                render={() => <RedirectHome currentLocation="/register" />}
            />
        </Switch>
    </Router>
);

export default RouteManager;
