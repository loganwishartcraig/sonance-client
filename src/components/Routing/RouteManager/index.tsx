import * as React from 'react';
import LoginPage from '../../../pages/Login';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../../App';
import RegisterPage from '../../../pages/Register';
import PrivateRoute from '../PrivateRoute';
import RedirectHome from '../RedirectHome';

const RouteManager: React.FunctionComponent = () => (
    <Router>

        <Link to="/login">Login</Link><br />
        <Link to="/register">Register</Link><br />

        <PrivateRoute
            path="/"
            exact
            component={App}
            noAuthComponent={LoginPage}
        // pendingCacheRender={() => <span>Loading...</span>}
        ></PrivateRoute>

        <PrivateRoute
            path="/login"
            exact
            noAuthComponent={LoginPage}
            render={() => <RedirectHome currentLocation="/login" />}
        // pendingCacheRender={() => <span>Loading...</span>}
        />

        <PrivateRoute
            path="/register"
            exact
            noAuthComponent={RegisterPage}
            render={() => <RedirectHome currentLocation="/register" />}
        // pendingCacheRender={() => <span>Loading...</span>}
        />

    </Router>
);

export default RouteManager;
