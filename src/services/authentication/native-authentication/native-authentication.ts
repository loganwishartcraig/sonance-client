import { GenericError } from '../../../common/GenericError';
import { INetworkRequestFailure } from '../../../configuration/interfaces';
import { SONANCE_API_ENDPOINT } from '../../../constants/api_endpoints';
import { GenericErrorCode, NetworkServiceErrorCode } from '../../../constants/error_codes';
import Authenticator, {
    IAuthenticationService,
    ILoginSuccess,
    IRegistrationSuccess
} from '../authentication-service/authentication-service';

export interface INativeLoginRequest {
    readonly email: string;
    readonly password: string;
}

export interface INativeRegistrationRequest {
    readonly email: string;
    readonly password: string;
    readonly nameFirst: string;
    readonly nameLast: string;
}

export default class NativeAuthentication extends Authenticator {

    private static readonly _resourcePaths = {
        login: '/auth/login',
        registration: '/auth/register',
        logout: '/auth/logout',
    };

    constructor(config: IAuthenticationService) {
        super(config);
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

        const url = `${SONANCE_API_ENDPOINT}${NativeAuthentication._resourcePaths.login}`;
        const response = await this.post(url, payload);

        if (!response.ok) {
            throw await this._resolveErrorFromResponse(response);
        } else {
            return this._resolveSuccessJson<ILoginSuccess>(response);
        }

    }

    public async register(payload: INativeRegistrationRequest): Promise<IRegistrationSuccess> {

        const url = `${SONANCE_API_ENDPOINT}${NativeAuthentication._resourcePaths.registration}`;
        const response = await this.post(url, payload);

        if (!response.ok) {
            throw await this._resolveErrorFromResponse(response);
        } else {
            return this._resolveSuccessJson<IRegistrationSuccess>(response);
        }

    }

    public async logout(): Promise<void> {

        const url = `${SONANCE_API_ENDPOINT}${NativeAuthentication._resourcePaths.logout}`;
        const response = await this.post(url);

        if (!response.ok) {
            throw await this._resolveErrorFromResponse(response);
        }

    }

}
