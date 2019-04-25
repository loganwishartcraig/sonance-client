import * as React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { IAppState, IConnectedComponentProps } from '../../../store';

export interface IPrivateRouteOwnProps extends RouteProps {
    noAuthComponent?: RouteProps['component'];
    noAuthRender?: RouteProps['render'];
}

interface IPrivateRouteStateProps {
    authorized: boolean;
}

type IPrivateRouteProps = IConnectedComponentProps<IPrivateRouteStateProps, {}, IPrivateRouteOwnProps>;

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = ({
    authorized,
    noAuthComponent: NoAuthComponent,
    noAuthRender,
    component: Component,
    render: authRender,
    ...restRouteProps
}) => (
        <Route
            {...restRouteProps}
            render={props => {

                if (authorized && typeof authRender === 'function') {
                    return authRender(props);
                } else if (authorized && Component) {
                    return <Component {...props} />;
                } else if (typeof noAuthRender === 'function') {
                    return noAuthRender(props);
                } else if (NoAuthComponent) {
                    return <NoAuthComponent {...props} />;
                } else {
                    throw new Error('Cannot render no auth private route component - no method provided.');
                }

            }}
        />
    );

const stateToProps: MapStateToPropsParam<
    IPrivateRouteStateProps,
    IPrivateRouteOwnProps,
    IAppState
> = ({ authentication: { auth: { authorized } } }) => ({
    authorized,
});

export default connect(stateToProps)(PrivateRoute);
