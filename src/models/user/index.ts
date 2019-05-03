export const ActiveUserKey: string = 'active';

export interface IUser {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
}

export class User {



    // readonly email: string;
    // readonly firstName: string;
    // readonly lastName: string;

    // readonly type: string = ActiveUserKey;

    // constructor(config: IUser) {

    //     this.email = config.email;
    //     this.firstName = config.firstName;
    //     this.lastName = config.lastName;

    //     console.warn('constructed user', config);
    // }
}
