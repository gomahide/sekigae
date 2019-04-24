import { ParsedUrlQuery } from 'querystring';
import { Student, Classroom } from './entities';
import Enumerable from 'linq';
import * as randomLib from 'random-seed';

//  シードの値を取得する。
export function getSeedValue(queryMap: ParsedUrlQuery): number {
    const rawValue: string | string[] | undefined = queryMap['seed'];

    //  文字列の場合 (クエリに1つだけ指定された場合)
    if (typeof (rawValue) == 'string') {
        const parsed = Number.parseInt(rawValue as string)
        return !Number.isNaN(parsed) ? parsed : generateRand();
    }

    //  それ以外 (複数指定か未指定) ならば、シード値自体もランダムに決めちゃう。
    else return generateRand();
}

//  学生の配列を生成する。
export function generateStudents(queryMap: ParsedUrlQuery): Student[] {
    const totalNum = Classroom.verticalSize * Classroom.horizontalSize;
    const specifiedNums = getSpecifiedNums(queryMap);

    return Enumerable.range(1, totalNum).select(num => new Student(num, specifiedNums.includes(num))).toArray();
}

//  シード指定なしの乱数を生成する。
function generateRand(): number {
    const range = 100;
    const random = randomLib.create();

    return random(range);
}

//  クエリで指定された出席番号を取得する。
function getSpecifiedNums(queryMap: ParsedUrlQuery): number[] {
    const rawValue: string | string[] | undefined = queryMap['mae'];

    //  未定義の場合 (クエリに指定されなかった場合)
    if (rawValue == undefined)
        return Array<number>()

    //  文字列の場合 (クエリに1つだけ指定された場合)
    else if (typeof (rawValue) == 'string') {
        const parsed = Number.parseInt(rawValue as string);
        return !Number.isNaN(parsed) ? [parsed] : new Array<number>();
    }

    //  文字列配列の場合 (クエリに複数指定された場合)
    else return Enumerable.from(rawValue as string[])
        .select(numStr => Number.parseInt(numStr))
        .where(n => !Number.isNaN(n))
        .toArray();
}