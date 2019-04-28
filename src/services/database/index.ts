import Dexie from 'dexie';
import { IUser } from '../../models/user';

const DATABASE_NAME = 'SonanceModels';

class DatabaseService extends Dexie {

    public users: Dexie.Table<IUser, string>;

    constructor() {
        super(DATABASE_NAME);
    }

}
