import twitter from 'twitter-v2';
import sleep from './Sleep';
import config from 'config';

const CREDENTIAL: ConfigData.Credential = config.get('credential');
const USER_ID:string = config.get('userId');
const QUERY_INTERVAL: number = config.get('getLikedQueryInterval');

function likedTweetsHandler(res: TwitterResponse.LikedTweets): DataBaseRecord.Tweets[] {
    const data = res.data;
    const medias = res.includes.media;
    const users = res.includes.users;

    const result: DataBaseRecord.Tweets[] = [];

    data.forEach(tweet => {
        const user = users.find(user => user.id == tweet.author_id);
        tweet.attachments?.media_keys.forEach(mediaKey => {
            const media = medias.find(media => media.media_key == mediaKey);
            if(!media || !user || !media.media_key) return;
            result.push({
                tweet_id: tweet.id,
                media_key: media?.media_key,
                image_url: media?.url,
                media_type: media?.type,
                user_id: user?.id,
                has_downloaded: 0
            });
        })
    });

    return result;
}

export = async function* getLikedTweets(reqCount?: number) {
    const requestLimit = reqCount ? reqCount : 75;

    const client = new twitter(CREDENTIAL);
    const params: {'expansions': string, 'media.fields': string, 'pagination_token'?: string } = {
        'expansions': 'attachments.media_keys,author_id',
        'media.fields': 'media_key,url'
    };

    let count = 0;
    while(count < requestLimit) {
        count++

        const res = await client.get<TwitterResponse.LikedTweets>(`users/${USER_ID}/liked_tweets`, params);

        yield* likedTweetsHandler(res);
        if(!res.meta.next_token) break;
        params.pagination_token = res.meta.next_token;

        await sleep(QUERY_INTERVAL);
    }
 }