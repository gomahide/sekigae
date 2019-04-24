import * as urlLib from 'url';
import { Classroom } from './entities';
import { generateStudents, getSeedValue } from './queries';

window.onload = () => {
    //  <やること>
    //  * クエリをパースする。
    //  * Studentの配列を生成する。
    //  * 席を配置する。
    //  * DOMを更新する。
    //  * 「CSV形式でダウンロード」ボタンのイベントを購読する。
    alert('これは席替えプログラムです。');

    //  URLのクエリをパースし、シード値と前方の席の希望者を取得する。
    const queryMap = urlLib.parse(location.href, true).query;
    const seed = getSeedValue(queryMap);
    const students = generateStudents(queryMap);

    //  席替え済みの教室のデータを生成する。
    const classroom = Classroom.generate(seed, students);
    
    console.log(classroom.toCsvString());
}