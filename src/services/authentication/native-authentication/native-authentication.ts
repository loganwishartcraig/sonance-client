import Authenticator, {
    IAuthenticationService,
    ILoginSuccess,
    ILogoutSuccess
} from '../authentication-service/authentication-service';
import { AuthenticationErrorCode, GenericErrorCode, NetworkServiceErrorCode } from '../../../constants/error_codes';
import { GenericError, IGenericError } from '../../../common/GenericError';
import { SONANCE_API_ENDPOINT } from '../../../constants/api_endpoints';
import { INetworkRequestFailure } from '../../../configuration/interfaces';

export interface INativeLoginRequest {
    email: string;
    password: string;
}

export default class NativeAuthentication extends Authenticator {

    private static readonly _resourcePaths = {
        login: '/auth/login',
    };

    constructor(config: IAuthenticationService) {
        super(config);
    }

    private _validateLoginPayload({ email, password }: INativeLoginRequest) {

        if (!email) {
            throw new GenericError({
                code: AuthenticationErrorCode.INVALID_EMAIL,
                message: 'Enter your email in the format user@domain.com',
            });
        } else if (!password) {
            throw new GenericError({
                code: AuthenticationErrorCode.INVALID_PASSWORD,
                message: 'Enter your password.',
            });
        }

    }

    private async _resolveErrorFromResponse(response: Response): Promise<GenericError> {

        console.error('[NativeAuthentication] - Resolving error from response', { response });

        try {

            const errorConfig: INetworkRequestFailure = await response.json();

            return new GenericError(errorConfig);

        } catch (e) {
            return new GenericError({
                code: GenericErrorCode.UNKNOWN_ERROR,
                message: 'An unknown error ocurred.',
            });
        }
    }

    private async _resolveSuccessJson<T>(response: Response): Promise<T> {

        try {
            return await response.json();
        } catch (e) {
            throw new GenericError({
                code: NetworkServiceErrorCode.RESPONSE_PARSE_FAILURE,
                message: 'An error ocurred while parsing the response.',
            });
        }
    }

    public async login(payload: INativeLoginRequest): Promise<ILoginSuccess> {

        this._validateLoginPayload(payload);

        const url = `${SONANCE_API_ENDPOINT}${NativeAuthentication._resourcePaths.login}`;
        const response = await this.postJson(url, payload);

        if (!response.ok) {
            throw await this._resolveErrorFromResponse(response);
        } else {
            return this._resolveSuccessJson<ILoginSuccess>(response);
        }

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
