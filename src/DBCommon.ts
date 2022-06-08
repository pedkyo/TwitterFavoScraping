import sqlite3 from 'sqlite3';
import config from 'config';

const DATABASE_FILEPATH: string = config.get('dbFilePath');

export = class DBCommon {
    private static _instance: DBCommon;
    private db: sqlite3.Database;

    private constructor() {
        this.db = new sqlite3.Database(DATABASE_FILEPATH);
    }

    public static get db() {
        if(this._instance) return this._instance.db;

        console.log('Create DBCommon instance');
        return new DBCommon().db;
    }
}