export interface IUser {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string;
    readonly username: string;
    readonly email: string;
    readonly phoneNumber?: string;
}

export class User implements IUser {

    public firstName: string;
    public lastName: string;
    public middleName?: string;
    public username: string;
    public email: string;
    public phoneNumber?: string;

    constructor(config: IUser) {
        this.firstName = config.firstName;
        this.lastName = config.lastName;
        this.middleName = config.middleName;
        this.username = config.username;
        this.email = config.email;
        this.phoneNumber = config.phoneNumber;
    }
}
