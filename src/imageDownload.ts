import axios from 'axios';
import fs from 'fs';
import config from 'config';

/** 
 * @return { Promise<boolean> } 成功時:true 失敗時:false
*/
export = async function imageDownload(url: string, imageName: string): Promise<boolean> {
    const folderPath: string = config.get('imageFolderPath');
    if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    if(!fs.existsSync(folderPath)) { console.log(`\x1b[31m${folderPath} Folder not found\u001b[0m`); return false; }

    try {
        const res = await axios(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(`${folderPath}/${imageName}`, Buffer.from(res.data), 'binary');
        console.log(`Download \x1b[31m${url}\u001b[0m as \x1b[31m${imageName}\u001b[0m completed`);
        return true;
    } catch(err: any) {
        // AxiosError以外の場合エラーをそのまま出力
        if(!axios.isAxiosError(err) || !err.response) {
            console.log(err);
            return false;
        }

        console.log(`${err.response.status} ${err.response.statusText}`);
        return false;
    }
}