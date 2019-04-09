import Authenticator, { IAuthenticationService, ILoginSuccess, ILogoutSuccess } from '../authentication-service/authentication-service';
import { AuthenticationErrorCode } from '../../../constants/error_codes';
import { GenericError } from '../../../generics/GenericError';

export interface INativeLoginRequest {
    email: string;
    password: string;
}

export default class NativeAuthentication extends Authenticator {

    constructor(config: IAuthenticationService) {
        super(config);
    }

    public async login({ email, password }: INativeLoginRequest): Promise<ILoginSuccess> {

        if (!email) {
            throw new GenericError({ code: AuthenticationErrorCode.INVALID_EMAIL, message: 'The email provided is invalid!' });
        } else if (!password) {
            throw new GenericError({ code: AuthenticationErrorCode.INVALID_PASSWORD, message: 'The password provided is invalid!' });
        }

        await new Promise(r => {

            setTimeout(() => r(), 2000);

        });

        return {
            auth: {
                token: 'xxx-xxx-xxx-TEST-TOKEN',
                expires: new Date((new Date().getTime()) + 24 * 7 * 60 * 60),
                issued: new Date(),
            },
            user: {
                email: 'test@test.com',
                firstName: 'test',
                lastName: 'user',
                username: 'test_user',
            },
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
