# 席替えプログラム
https://github.com/aridai/sekigae

## なにこれ?
石川高専5Iの席替えをするプログラムです。

## 使い方
クエリを渡してあげることでいろいろと指定することができます。  
例: `https://aridai.github.io/sekigae/?seed=あそしえいとぷろふぇっさーよしかず&mae=2&mae=4&mae=6&mae=15`

| クエリ | 値 |
|:---:|:---|
| seed | 乱数で使うシード値 (文字列) |
| mae | 前の方の席がいい人の出席番号 (複数指定可) |

生成した座席表は **CSV** 形式でダウンロードすることができます。

## 開発について
言語は **TypeScript** で開発しています。  
**browserify** + **tsify** で **JavaScript** にトランスパイルして、それをクライアント側で実行しています。  
席替えプログラムのWebページは **GitHub Pages** でホストしています。  
プロジェクトディレクトリの `docs` 以下がページとして表示されるようになっています。

### ビルド方法
カレントディレクトリをこのプロジェクトのルートにして `npm run build` を実行してください。  
トランスパイルされたスクリプトは `docs/script.js` に出力されます。

## ライセンス
MITライセンスです。  
詳しくは [こちら](https://github.com/aridai/sekigae/blob/master/LICENSE) を参照してください。

あと、いらすとやからイスのイラストを借りてきてましゅ。  
さんくす!
https://www.irasutoya.com/2017/06/blog-post_371.html
