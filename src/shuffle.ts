import { Student, Classroom } from './entities';
import * as randomLib from 'random-seed'
import Enumerable from 'linq';

//  制約を考慮しつつ、学生を適当に配置する。
export function shuffle(seed: string, students: Student[]): Student[][] {
    const hSize = Classroom.horizontalSize;

    //  指定したシード値に基づく乱数を生成する。
    //  (再現可能性がある乱数になっているハズ。)
    const random = randomLib.create(seed);
    const range = students.length;

    //  各座席とランダムな別の座席との入れ替えをしていく。
    for (let i = 0; i < range; i++) {
        const targetIndex = random(range);
        swap(students, i, targetIndex);
    }

    //  前の席を希望する人を左前方の座席から順に再配置していく。 (ただし、右端は避ける。)
    //  この操作を上のループでまとめてやってしまうと配置が偏るためループを分けた。
    let counter = 0;    //  "前の席" のインデックスを指すカウンタで、希望者を再配置すると増えていく。
    for (let i = 0; i < range; i++) {
        const student = students[i];
        if (student.front) {
            //  もし右端の席ならばカウンタを1つ進めて、右端に配置されるのを避ける。
            const isRightEdge = (counter + 1) % hSize == 0;
            if (isRightEdge) counter++;

            swap(students, i, counter);
            counter++;
        }
    }

    //  横方向サイズでワンセットになるように2次元配列に詰める。
    return Enumerable.from(students)
        .buffer(hSize)
        .select(e => (e as any) as Array<Student>)  //  linq.jsの型定義ファイルのバグを修正するため。
        .toArray();
}

//  配列の要素を入れ替える。
function swap<T>(array: T[], index1: number, index2: number): void {
    const backupOfIndex1 = array[index1];
    array[index1] = array[index2];
    array[index2] = backupOfIndex1;
}