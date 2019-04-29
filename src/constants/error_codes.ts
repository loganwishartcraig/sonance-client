export enum AuthenticationErrorCode {
    INVALID_EMAIL = 'ERROR::AUTHENTICATION::INVALID_EMAIL',
    INVALID_PASSWORD = 'ERROR::AUTHENTICATION::INVALID_PASSWORD',
}

export enum GenericErrorCode {
    UNKNOWN_ERROR = 'ERROR::GENERIC::UNKNOWN',
}

export enum NetworkServiceErrorCode {
    RESPONSE_PARSE_FAILURE = 'ERROR::NETWORK_SERVICE::RESPONSE_PARSE_FAILURE',
}

export enum DatabaseServiceErrorCode {
    RECORD_NOT_FOUND = 'ERROR::DATABASE_SERVICE::RECORD_NOT_FOUND',
}
