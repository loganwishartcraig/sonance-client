import { AuthenticationErrorCode, GenericErrorCode, NetworkServiceErrorCode } from './error_codes';

describe('Constants - Error Codes', () => {

    it('should export the correct authentication error codes', () => {

        expect(AuthenticationErrorCode.INVALID_EMAIL).toEqual('ERROR::AUTHENTICATION::INVALID_EMAIL');
        expect(AuthenticationErrorCode.INVALID_PASSWORD).toEqual('ERROR::AUTHENTICATION::INVALID_PASSWORD');

    });

    it('should export the correct generic error codes', () => {
        expect(GenericErrorCode.UNKNOWN_ERROR).toEqual('ERROR::GENERIC::UNKNOWN');
    });

    it('should export the correct network service error codes', () => {
        expect(NetworkServiceErrorCode.RESPONSE_PARSE_FAILURE)
            .toEqual('ERROR::NETWORK_SERVICE::RESPONSE_PARSE_FAILURE');
    });

});
