import { Student, Classroom } from './entities';
import Enumerable from 'linq';
import * as localStorage from './localstorage';

//  DOMの書き換え処理をする。
export function setup(document: Document, seed: number, students: Student[], classroom: Classroom): void {
    const seedView = findElement(document, 'seed');
    const frontView = findElement(document, 'front');
    const tableView = findElement(document, 'table');
    const downloadView = findElement(document, 'download');

    seedView.innerText = seed.toString();
    frontView.innerText = Enumerable.from(students).where(s => s.front).orderBy(s => s.num).toArray().join(', ');
    tableView.replaceWith(generateTable(document, classroom));
    downloadView.onclick = () => { localStorage.saveCsv(document, classroom.toCsvString()) };
}

//  IDで要素を探す。
function findElement(document: Document, id: string): HTMLElement {
    const view = document.getElementById(id);
    return (view != null) ? view : document.createElement('object');
}

//  座席表のtableタグを生成する。
function generateTable(document: Document, classroom: Classroom): HTMLTableElement {
    const tableView = document.createElement('table');

    for (let v = 0; v < Classroom.verticalSize; v++) {
        const rowView = tableView.insertRow();

        for (let h = 0; h < Classroom.horizontalSize; h++) {
            const cellView = rowView.insertCell();
            const student = classroom.getStudent(v, h);

            if (student != null)
                cellView.innerText = student.toString();
        }
    }

    return tableView;
}