import getLikedTweets from './getLikedTweets';
import imageDownload from './imageDownload';
import Sleep from './Sleep';
import TweetsTable from './TweetsTable';
import config from 'config';

(async function(){
    TweetsTable.createTableIfNotExists();

    const getLikeQueryLimit: number = config.get('getLikedQueryLimit');
    const list = getLikedTweets(getLikeQueryLimit);

    const result = []
    while(true) {
        const res = await list.next()
        if(!res.value) break;
        result.push(res.value);
        if(res.done) break;
    }
    await TweetsTable.insertTweets(result);

    const records = await TweetsTable.getNotDownloaded();
    for(const record of records) {
        if(record.has_downloaded == 1 || !record.image_url) { continue; }
        const fileName = record.image_url.split('/').slice(-1)[0];
        const result = await imageDownload(record.image_url + ':orig', fileName);
        if(result) TweetsTable.updateStatusToDownloaded(record.tweet_id);
        await Sleep(config.get('imageDownloadInterval'));
    }

    console.log('Process Completed');
})();