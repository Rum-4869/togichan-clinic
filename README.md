# とぎちゃんクリニック - Express + EJS 版

このプロジェクトは、静的 HTML を EJS テンプレートに変換し、Express で配信する例です。

## 使い方

1. ターミナルでプロジェクトフォルダに移動します。

   ```bash
   cd /Users/macbookpro2015/Desktop/ポートフォリオ/とぎちゃんクリニック
   ```

2. 依存パッケージをインストールします。

   ```bash
   npm install
   ```

3. サーバーを起動します。

   ```bash
   npm start
   ```

4. ブラウザで `http://localhost:3000` を開きます。

## どこが EJS なのか

- `app.js` で `express` と `ejs` を使い、`views/index.ejs` を描画しています。
- `views/index.ejs` 内では、`newsItems` や `services` などの配列をループ処理して HTML を作成しています。
- 今後は `app.js` にデータを追加して、動的なページを作りやすくできます。
