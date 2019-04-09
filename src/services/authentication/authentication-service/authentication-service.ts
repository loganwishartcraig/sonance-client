import Logger from '../../Logger';
import { IUser } from '../../../configuration/interfaces';
import { Utilities } from '../../../utilities';

export interface IAuthenticationService {
    logger: Logger;
}

export interface ILoginSuccess {
    auth: {
        token: TokenId,
        issued: Date;
        expires: Date;
    };
    user: IUser;
}

export interface ILogoutSuccess {
    message: string;
}

export type SessionId = string;
export type TokenId = string;

export const generateSessionId = (): SessionId => Utilities.generateRandomId();

abstract class Authenticator {

    protected _logger: Logger;

    constructor(config: IAuthenticationService) {
        this._logger = config.logger;
    }

    public abstract login(payload: any): Promise<ILoginSuccess>;
    public abstract logout(): Promise<ILogoutSuccess>;

}

export default Authenticator;
