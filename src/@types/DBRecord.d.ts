declare module DataBaseRecord {
    interface Tweets {
        tweet_id: string;
        media_key: string;
        image_url: string;
        media_type: string;
        user_id: string;
        has_downloaded?: number;
    }
}