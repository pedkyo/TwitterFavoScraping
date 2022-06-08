import DBCommon from "./DBCommon";

export = class TweetsTable {
    static db = DBCommon.db;

    static createTableIfNotExists() {
        const db = this.db;
        const sql = `
            CREATE TABLE IF NOT EXISTS tweets
            (
                media_key PRIMARY KEY,
                tweet_id,
                image_url,
                media_type,
                user_id,
                has_downloaded
            )
        `;

        return new Promise<void>((resolve, reject) => {
            db.run(sql, (err) => {
                if(err) reject(err);
                resolve();
            });
        });
    }

    static insertTweets(records: DataBaseRecord.Tweets[]) {
        const db = this.db;
        const sql = `
            INSERT OR IGNORE INTO tweets
            VALUES(
                $media_key,
                $tweet_id,
                $image_url,
                $media_type,
                $user_id,
                $has_downloaded
            )
        `;

        return new Promise<void>((resolve, reject) => {
            db.serialize(() => {
                db.exec('BEGIN TRANSACTION');
                const stmt = db.prepare(sql);

                records.forEach(record => {
                    stmt.run({
                        $tweet_id: record.tweet_id,
                        $image_url: record.image_url,
                        $media_key: record.media_key,
                        $media_type: record.media_type,
                        $user_id: record.user_id,
                        $has_downloaded: record.has_downloaded
                    });
                });

                stmt.finalize();
                db.exec('COMMIT', err => {
                    if(err) reject(err);
                    resolve();
                });
            });
        });
    }

    static updateStatusToDownloaded(media_key: string) {
        const db = this.db;
        const sql = `
            UPDATE tweets SET has_downloaded = 1
            WHERE media_key = $media_key
        `;

        return new Promise<void>((resolve, reject) => {
            db.run(
                sql,
                { $media_key: media_key },
                err => {
                    if(err) reject(err);
                    // console.log(`Updated media_key ${media_key} status as "has downloaded"`)
                    resolve();
                }
            );
        });
    }

    static getAll() {
        const sql = 'SELECT * from tweets';

        return this.all<DataBaseRecord.Tweets>(sql);
    }

    static getNotDownloaded() {
        const sql = `
            SELECT * FROM tweets
            WHERE has_downloaded = 0 AND NOT image_url = "null"
         `;

        return this.all<DataBaseRecord.Tweets>(sql);
    }

    private static all<T>(sql: string): Promise<T[]> {
        const db = this.db;
        
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
        });
    }
}