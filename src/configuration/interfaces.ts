export interface IUser {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string;
    readonly username: string;
    readonly email: string;
    readonly phoneNumber?: string;
}

export interface INetworkRequestFailure<CodeType = string> {
    readonly code: CodeType;
    readonly message: string;
}
