# SCSSコメントヘッダー運用ルール

## 目的

`scss` / `module.scss` ファイルの先頭に、用途・参照元・更新日が分かるコメントを統一して記載する。

---

## 対象

- `src/**/*.scss`
- `src/**/*.module.scss`

---

## 記載ルール

- ファイル先頭に記載する
- `URL` はこの repo 内のパスが分かる形で書く
- `Referenced in` は対応する `tsx` や読み込み元を書く
- 修正したら `Last updated` を更新する
- タイトルは「熊本市中央公民館 + 対象名 + スタイル」で簡潔に書く

---

## テンプレート

```scss
/* =======================================
 * 熊本市中央公民館 Header スタイル
 * URL: /src/styles/components/common/Header.module.scss
 * Referenced in: /src/components/common/Header.tsx
 * Created: 2026-06-18
 * Last updated: 2026-06-18
 * ======================================= */
```

---

## 補足

- 既存の `globals.scss` や page 単位 SCSS も同じ形式でそろえてよい
- 日付は `YYYY-MM-DD` で統一する
