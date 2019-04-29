export const ActiveUserKey: string = 'active';

export interface IUser {
    readonly email: string;
    readonly name: {
        readonly first: string;
        readonly last: string;
    };
}

export class User implements IUser {

    readonly email: string;
    readonly name: {
        readonly first: string;
        readonly last: string;
    };

    readonly type: string = ActiveUserKey;

    constructor(config: IUser) {

        this.email = config.email;
        this.name = { ...config.name };
        console.warn('constructed user', config);
    }
}
