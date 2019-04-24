import { Student, Classroom } from './entities';
import Enumerable from 'linq';

//  DOMの書き換え処理をする。
export function setup(document: Document, seed: number, students: Student[], classroom: Classroom): void {
    const seedView = findElement(document, 'seed');
    const frontView = findElement(document, 'front');
    const tableView = findElement(document, 'table');
    const downloadView = findElement(document, 'download');

    seedView.innerText = seed.toString();
    frontView.innerText = Enumerable.from(students).where(s => s.front).orderBy(s => s.num).toArray().join(', ');
    tableView.replaceWith(generateTable(document, classroom));
    downloadView.onclick = () => { downloadCsv(classroom.toCsvString()) };
}

//  IDで要素を探す。
function findElement(document: Document, id: string): HTMLElement {
    const view = document.getElementById(id);
    return (view != null) ? view : document.createElement('object');
}

//  座席表のtableタグを生成する。
function generateTable(document: Document, classroom: Classroom): HTMLTableElement {
    const dummy = document.createElement('table');
    return dummy;
}

//  CSV形式でダウンロードさせる。
function downloadCsv(csvText: string): void {
    alert(`座席表:\n${csvText}`);
}