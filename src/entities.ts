import * as logic from './shuffle';
import Enumerable from 'linq';

//  エンティティは基本的にイミュータブルに設計する。

export class Student {

    //  出席番号と前の席がいいかどうかを表すフラグを保持する。
    public constructor(
        public readonly num: number,
        public readonly front: boolean
    ) { }

    public toString(): string { return `No.${this.num}`; }
}

export class Classroom {

    //  7行6列の机の配置にする。
    public static readonly verticalSize = 7;
    public static readonly horizontalSize = 6;

    //  2次元の配列を受け取り、そのまま返すだけの実装とする。
    private constructor(private readonly students: Student[][]) { }

    //  指定した位置の学生を取得する。
    //  vIndex: 縦の位置 (0~6)
    //  hIndex: 横の位置 (0~5)
    //  不正な位置指定の場合はnullを返す。
    public getStudent(vIndex: number, hIndex: number): Student | null {
        const isInRange = (0 <= vIndex && vIndex < Classroom.verticalSize) && (0 <= hIndex && hIndex < Classroom.horizontalSize);
        return isInRange ? this.students[vIndex][hIndex] : null;
    }

    //  CSV形式の文字列に変換する。
    public toCsvString(): string {
        return Enumerable.from(this.students)
            .select(column => column.map(s => s.num).join(','))
            .toArray().join('\n');
    }

    //  適切に学生が配置された教室を生成する。
    public static generate(seed: number, students: Student[]): Classroom {
        const matrix: Student[][] = logic.shuffle(seed, students);
        return new Classroom(matrix);
    }
}