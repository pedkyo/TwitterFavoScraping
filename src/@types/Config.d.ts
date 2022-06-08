declare module ConfigData {
    type count = number;
    interface Credential {
        consumer_key: string;
        consumer_secret: string;
        access_token_key: string;
        access_token_secret: string;
    };
    type userId = string;
    type dbFilePath = string;
    type imageDownloadInterval = number;
};