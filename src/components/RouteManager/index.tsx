import * as React from 'react';
import LoginPage from '../../pages/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';

const RouteManager: React.FunctionComponent = () => (
    <Router>
        <Route path="/" exact component={App}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        {/* <Route component={App} /> */}
    </Router>
);

export default RouteManager;
