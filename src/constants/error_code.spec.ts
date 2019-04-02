import { AuthenticationErrorCode } from './error_codes';

describe('Constants - Error Codes', () => {

    it('should export the correct authentication error codes', () => {

        expect(AuthenticationErrorCode.INVALID_EMAIL).toEqual('ERROR::AUTHENTICATION::INVALID_EMAIL');
        expect(AuthenticationErrorCode.INVALID_PASSWORD).toEqual('ERROR::AUTHENTICATION::INVALID_PASSWORD');
        expect(AuthenticationErrorCode.INCORRECT_PASSWORD).toEqual('ERROR::AUTHENTICATION::INCORRECT_PASSWORD');
        expect(AuthenticationErrorCode.INCORRECT_USERNAME).toEqual('ERROR::AUTHENTICATION::INCORRECT_USERNAME');

    });

});
