import { Student, Classroom } from './entities';
import * as randomLib from 'random-seed'
import Enumerable from 'linq';

//  制約を考慮しつつ、学生を適当に配置する。
export function shuffle(seed: string, students: Student[]): Student[][] {
    const vSize = Classroom.verticalSize;
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

    //  TODO: この実装では、前方希望者が多いときに、最前行の両端を残したまま次の行を候補に入れてしまうため、できればそれを改善する。
    //  (https://github.com/aridai/sekigae/issues/7#issuecomment-486917080)

    //  前方希望者とそれらが配置されうる座席のリストを作る。
    //  希望者数には制限を掛ける。
    const limit = vSize * (hSize - 2);
    let frontApplicantIndices = Enumerable.from(students)
        .select((student, index) => index)
        .where(index => students[index].front)
        .take(limit)
        .toArray();

    const rowCount = Math.ceil(frontApplicantIndices.length / (hSize - 2));
    let frontSeats = Enumerable.range(0, rowCount * hSize)
        .where(i => !isLeftEdgeSeat(i, hSize))
        .where(i => !isRightEdgeSeat(i, hSize))
        .toArray();

    //  希望者が既に前方にいるならば除外する。
    frontApplicantIndices = frontApplicantIndices.filter(currentSeatIndex => {
        const isAlreadyFront = frontSeats.some(frontSeatIndex => frontSeatIndex == currentSeatIndex);
        if (isAlreadyFront) frontSeats = frontSeats.filter(frontSeatsIndex => frontSeatsIndex != currentSeatIndex);
        return !isAlreadyFront;
    });

    //  希望者を入れ替えていく。
    frontApplicantIndices.forEach(currentSeatIndex => {
        const destSeatIndex = frontSeats[random(frontSeats.length)];
        swap(students, currentSeatIndex, destSeatIndex);
        frontSeats = frontSeats.filter(frontSeatIndex => frontSeatIndex != destSeatIndex);
    });

    //  横方向サイズでワンセットになるように2次元配列に詰める。
    return Enumerable.from(students)
        .buffer(hSize)
        .select(e => (e as any) as Array<Student>)  //  linq.jsの型定義ファイルのバグを修正するため。
        .toArray();
}

//  配列の要素を入れ替える。
function swap<T>(array: T[], index1: number, index2: number): void {
    if ((0 <= index1 && index1 < array.length) && (0 <= index2 && index2 < array.length)) {

        const backupOfIndex1 = array[index1];
        array[index1] = array[index2];
        array[index2] = backupOfIndex1;
    } else {
        console.log(`OutOfBoundsException: ${array.length}, ${index1}, ${index2}`);
    }
}

//  その座席が教室の左端の列にある席かどうかを判定する。
function isLeftEdgeSeat(index: number, hSize: number): boolean {
    return index % hSize == 0;
}

//  その座席が教室の右端の列にある席かどうかを判定する。
function isRightEdgeSeat(index: number, hSize: number): boolean {
    return (index + 1) % hSize == 0;
}