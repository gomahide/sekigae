import { ParsedUrlQuery } from 'querystring';
import { Student, Classroom } from './entities';
import Enumerable from 'linq';
import * as randomLib from 'random-seed';

//  シードの値を取得する。
export function getSeedValue(queryMap: ParsedUrlQuery): string {
    const rawValue: string | string[] | undefined = queryMap['seed'];

    if (typeof (rawValue) == 'string' && isNotNullOrWhitespace(rawValue))
        return rawValue.toString();

    return generateRand().toString();
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

//  文字列がNullや空白文字ではないかを判定する。
function isNotNullOrWhitespace(str: string | null | undefined): boolean {
    if (str == null || str == undefined) return false;

    if (typeof (str) == 'string')
        return str.replace(/\s/g, '').length > 0;

    return false;
}