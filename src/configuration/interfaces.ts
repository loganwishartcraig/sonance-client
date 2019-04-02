export interface IUser {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string;
    readonly username: string;
    readonly email: string;
    readonly phoneNumber?: string;
}

export interface INetworkRequestFailure {
    readonly code: string;
    readonly message: string;
}
