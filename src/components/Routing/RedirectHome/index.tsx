
import * as React from 'react';
import { Redirect } from 'react-router';

export interface IRedirectHomeProps {
    currentLocation: string;
}

const RedirectHome: React.FunctionComponent<IRedirectHomeProps> = ({ currentLocation }) => (
    <Redirect to={{
        pathname: '/',
        state: { referrer: currentLocation },
    }} />
);

export default RedirectHome;
