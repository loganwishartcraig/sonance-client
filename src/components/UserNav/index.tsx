import * as React from 'react';
import LogoutButton from '../Authentication/LogoutButton';

const UserMenu: React.FunctionComponent = () => (
    <div>
        <menu type="toolbar">
            <li><LogoutButton>Logout!!</LogoutButton></li>
        </menu>
    </div>
);

export default UserMenu;
