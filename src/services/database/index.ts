import Dexie from 'dexie';
import { IUser, User } from '../../models/user';
import { appLogger } from '../Logger';

const MODEL_DB_NAME = 'SonanceModelDB';
const MODEL_DB_VERSION = 1;

export enum DatabaseTable {
    USER = 'users',
}

export class DatabaseService extends Dexie {

    public users: Dexie.Table<IUser, string>;

    constructor() {

        super(MODEL_DB_NAME);
        this._initEventListeners();
        this.version(MODEL_DB_VERSION).stores({
            users: ',&email',    // First key blank, allows single record at a time.
        });

        this.users = this.table(DatabaseTable.USER);

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

    // public cache<Table extends DatabaseTable>(table: Table, model: DatabaseModel<Table>, key?: string) {

    // }

}

export const databaseService = new DatabaseService();
