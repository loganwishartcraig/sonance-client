import Logger from '../../Logger';
import { IUser } from '../../../configuration/interfaces';
import { Utilities } from '../../../utilities';

export interface IAuthenticationService {
    logger: Logger;
}

export interface ILoginSuccess {
    user: IUser;
}

export interface ILogoutSuccess {
    message: string;
}

export type SessionId = string;

export const generateSessionId = (): SessionId => Utilities.generateRandomId();

abstract class Authenticator {

    protected _logger: Logger;

    constructor(config: IAuthenticationService) {
        this._logger = config.logger;
    }

    public abstract login(payload: any): Promise<ILoginSuccess>;
    public abstract logout(): Promise<ILogoutSuccess>;

    public async postJson<J extends Object>(url: string, payload: J): Promise<Response> {

        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

    }

}

export default Authenticator;
