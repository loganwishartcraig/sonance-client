import Authenticator, { IAuthenticationService, ILoginSuccess, ILogoutSuccess } from '../authentication-service/authentication-service';
import { TEST_USER } from '../../../action-creators/user/index.spec';

export interface INativeLoginRequest {
    username: string;
    password: string;
}

export default class NativeAuthentication extends Authenticator {

    constructor(config: IAuthenticationService) {
        super(config);
    }

    public async login(payload: INativeLoginRequest): Promise<ILoginSuccess> {

        await new Promise(r => {

            setTimeout(() => r(), 2000);

        });

        return {
            auth: {
                token: 'xxx-xxx-xxx-TEST-TOKEN',
                expires: new Date((new Date().getTime()) + 24 * 7 * 60 * 60),
                issued: new Date(),
            },
            user: { ...TEST_USER },
        };
    }

    public async logout(): Promise<ILogoutSuccess> {

        await new Promise(r => {

            setTimeout(() => r(), 2000);

        });

        return {
            message: 'logout OK',
        };

    }

}
