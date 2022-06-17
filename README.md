# TwitterFavoScraping

## 動作環境
- Node.js : v16
- ts-node : v8

## How to
### 準備
Twitter API Keyが必要になるので取得してください。
<https://developer.twitter.com/en/portal/projects-and-apps>

### 取得したAPI Keyをセット
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

### 稼働
1. npm install
2. npm run start

### 自動化
batファイルなどに記述してタスクタイマーなどで実行すると便利です
``` bat:: start.bat
npm run start
```