import sqlite3 from 'sqlite3';
import config from 'config';
import fs from 'fs';

export = class DBCommon {
    private static _instance: DBCommon;
    private db: sqlite3.Database;

    private constructor() {
        if(!fs.existsSync('./db')) {
            fs.mkdirSync('./db');
        }
        const dbPath: string = config.get('dbFileName');
        this.db = new sqlite3.Database(`./db/${dbPath}`);
    }

    public static get db() {
        if(this._instance) return this._instance.db;

        console.log('Create DBCommon instance');
        return new DBCommon().db;
    }
}