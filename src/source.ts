import * as urlLib from 'url';
import { Classroom } from './entities';
import { generateStudents, getSeedValue } from './queries';
import * as presentation from './presentation';

window.onload = () => {
    //  URLのクエリをパースし、シード値と前方の席の希望者を取得する。
    const queryMap = urlLib.parse(location.href, true).query;
    const seed = getSeedValue(queryMap);
    const students = generateStudents(queryMap);

    //  席替え済みの教室のデータを生成する。
    const classroom = Classroom.generate(seed, students);

    //  DOMに反映させる。
    presentation.setup(document, seed, students, classroom);
}