import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { logout } from '../../../action-creators/authentication';
import { IConnectedComponentProps } from '../../../store';

interface ILogoutButtonDispatchProps {
    logout: typeof logout;
}

interface ILogoutButtonOwnProps { }

type ILogoutButtonProps = IConnectedComponentProps<
    {},
    ILogoutButtonDispatchProps,
    ILogoutButtonOwnProps
>;

class LogoutButton extends React.Component<ILogoutButtonProps> {

    constructor(props: ILogoutButtonProps) {
        super(props);
    }

    private _handleClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.logout();
    }

    public render() {
        return (
            <button type="button" onClick={this._handleClick}>{
                this.props.children || 'Logout'
            }</button>
        );
    }

}

const dispatchToProps: MapDispatchToProps<
    ILogoutButtonDispatchProps,
    ILogoutButtonOwnProps
> = ({
    logout,
});

export default connect(null, dispatchToProps)(LogoutButton);
