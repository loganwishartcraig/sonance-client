import Dexie from 'dexie';
import { IUser, User } from '../../models/user';
import { appLogger } from '../Logger';

const MODEL_DB_NAME = 'SonanceModelDB';
const MODEL_DB_VERSION = 1;

const USER_TABLE_INDEX_KEYS: Array<keyof IUser> = ['type'];

export class DatabaseService extends Dexie {

    public users: Dexie.Table<User, string>;

    constructor() {

        super(MODEL_DB_NAME);
        this._initEventListeners();
        this.version(MODEL_DB_VERSION).stores({
            users: USER_TABLE_INDEX_KEYS.join(','),
        });

        this.users.mapToClass(User);

        appLogger.warn({ message: 'Constructed DatabaseService', meta: { instance: this } });

    }

    private _initEventListeners() {
        window.addEventListener('unhandledrejection', this._handleError);
        this.on('versionchange', this._handleVersionChange);
        this.on('ready', this._handleReady);
    }

    private _handleError = (...args: any[]) => {
        appLogger.error({ message: 'Database error encountered', meta: { args } });
    }

    private _handleVersionChange = (...args: any[]) => {
        appLogger.warn({ message: 'Database version change encountered', meta: { args } });
    }

    private _handleReady = (...args: any[]) => {
        appLogger.info({ message: 'Database ready', meta: { args } });
    }

}

export const databaseService = new DatabaseService();
