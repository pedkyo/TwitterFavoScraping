# TwitterFavoScraping

## How to
`.\config\production.json`にTwitter CredentialとTwitter User IDを記述してください。
```json
{
    "credential": {
        "consumer_key":"",
        "consumer_secret": "",
        "access_token_key": "",
        "access_token_secret": ""
    },
    "userId": "",
    "dbFileName": "app.db",
    "imageFolderPath": "./images",
    "imageDownloadInterval": 1000,
    "getLikedQueryInterval": 1000,
    "getLikedQueryLimit": 5
}
```
1. npm install
2. npm run start