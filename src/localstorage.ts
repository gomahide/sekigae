//  参考: https://blog.mudatobunka.org/entry/2017/04/23/135753

//  CSVファイルを保存する。
export function saveCsv(document: Document, csvText: string): void {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvText], { 'type': 'text/csv' });
    const url = window.URL;
    const blobUrl = url.createObjectURL(blob);

    openSaveFileDialog(document, blobUrl);
}

//  ファイルの保存するダイアログを開く。
//  仮想的なaタグを作って、それのクリックイベントを発火させている。
function openSaveFileDialog(docuent: Document, blobUrl: string): void {
    const aTag = document.createElement('a');
    aTag.download = decodeURI('table.csv');
    aTag.href = blobUrl;
    aTag.type = 'text/csv';

    aTag.click();
}