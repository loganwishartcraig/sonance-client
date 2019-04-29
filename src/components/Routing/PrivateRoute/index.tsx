import * as React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { IAppState, IConnectedComponentProps } from '../../../store';
import { appLogger } from '../../../services/Logger';

export interface IPrivateRouteOwnProps extends RouteProps {
    noAuthComponent?: RouteProps['component'];
    noAuthRender?: RouteProps['render'];

    pendingCacheComponent?: RouteProps['component'];
    pendingCacheRender?: RouteProps['render'];

}

interface IPrivateRouteStateProps {
    authorized: boolean;
    cacheResolved: boolean;
}

type IPrivateRouteProps = IConnectedComponentProps<IPrivateRouteStateProps, {}, IPrivateRouteOwnProps>;

const resolveComponentOrRenderProp = (
    renderProp: RouteProps['render'],
    Component: RouteProps['component'],
    props: any
): React.ReactNode => {

    if (typeof renderProp === 'function') {
        return renderProp(props);
    } else if (Component) {
        return <Component {...props} />;
    } else {
        appLogger.warn({ message: 'No render method provided for the private route. I hope this was intentional.' });
        return null;
    }

};

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = ({
    authorized,
    cacheResolved,
    noAuthComponent: NoAuthComponent,
    noAuthRender,
    component: Component,
    pendingCacheComponent: PendingCacheComponent,
    pendingCacheRender,
    render: authRender,
    ...restRouteProps
}) => (
        <Route
            {...restRouteProps}
            render={props => {

                if (!cacheResolved) {
                    return resolveComponentOrRenderProp(
                        pendingCacheRender,
                        PendingCacheComponent,
                        props
                    );
                } else if (authorized) {
                    return resolveComponentOrRenderProp(
                        authRender,
                        Component,
                        props
                    );
                } else {
                    return resolveComponentOrRenderProp(
                        noAuthRender,
                        NoAuthComponent,
                        props
                    );
                }

            }}
        />
    );

const stateToProps: MapStateToPropsParam<
    IPrivateRouteStateProps,
    IPrivateRouteOwnProps,
    IAppState
> = ({ authentication: { auth: { authorized, cacheResolved } } }) => ({
    authorized,
    cacheResolved,
});

export default connect(stateToProps)(PrivateRoute);
