import * as urlLib from 'url';
import { ParsedUrlQuery } from 'querystring';

const message = '🍭(๑•ૅㅁ•๑) < ｱﾒﾁｬﾝﾀﾍﾞﾙ?';

window.addEventListener('load', async () => {
    console.log('きさま!見ているなッ!');

    const button = document.getElementById('hyogo-pref-police');
    if (button != null) button.onclick = () => { while (true) alert(message) }

    await sleep(3000);

    const queryMap = urlLib.parse(location.href, true).query;
    const loopCount = getLoopCount(queryMap);

    if (loopCount == -1) while (true) { alert(message) }
    else for (let i = 0; i < loopCount; i++) { alert(message) }
});

//  クエリをパースしてアラートの表示回数を取得する。
function getLoopCount(queryMap: ParsedUrlQuery): number {
    const rawValue: string | string[] | undefined = queryMap['hyogo-pref-police'];

    if (rawValue == undefined) return 0;
    if (typeof(rawValue) == 'string') {
        const count = Number.parseInt(rawValue as string);
        return (!Number.isNaN(count) && count >= 0) ? count : -1;
    } else return -1;
}

function sleep(timeInMs: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeInMs);
    });
}