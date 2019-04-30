import { IUser } from '../../../models/user';
import { Utilities } from '../../../utilities';
import Logger from '../../Logger';

export interface IAuthenticationService {
    logger: Logger;
}

export interface ILoginSuccess {
    user: IUser;
}

export interface IRegistrationSuccess {
    user: IUser;
}

export type SessionId = string;

export const generateSessionId = (): SessionId => Utilities.generateRandomId();

abstract class Authenticator {

    public static AuthCookieKey: string = 'connect.sid';

    protected _logger: Logger;

    constructor(config: IAuthenticationService) {
        this._logger = config.logger;
    }

    public abstract login(payload: any): Promise<ILoginSuccess>;
    public abstract register(payload: any): Promise<IRegistrationSuccess>;
    public abstract logout(): Promise<void>;

    //  TODO: Should throw a 'GenericError' on 'fetch' throw.
    public async post<J extends Object>(url: string, payload?: J): Promise<Response> {

        const headers: Record<string, string> = {
            Accept: 'application/json',
        };

        const fetchOptions: RequestInit = {
            method: 'POST',
            credentials: 'include',
        };

        if (payload) {
            headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(payload);
        }

        fetchOptions.headers = headers;

        return fetch(url);

    }

}

export default Authenticator;
