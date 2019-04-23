import * as React from 'react';
import LoginPage from '../../pages/Login';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../App';
import RegisterPage from '../../pages/Register';

const RouteManager: React.FunctionComponent = () => (
    <Router>

        <Link to="/login">Login</Link><br />
        <Link to="/register">Register</Link><br />

        <Route path="/" exact component={App}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/register" exact component={RegisterPage}></Route>

        {/* <Route component={App} /> */}

    </Router>
);

export default RouteManager;
