# SEO総合チェック依頼テンプレート

## 依頼内容

このプロジェクト全体について、SEO観点で総合チェックをしてください。

## 前提

- Next.js App Router を使用
- `output: 'export'` 前提
- 既存サイト改善として判断すること
- 一般論ではなく、この repo の実装状態を見て指摘すること

## 必須チェック対象

- `/`
- `/entry/`
- `/news/detail/`
- `src/app/layout.tsx`
- `public/robots.txt`
- `sitemap.xml` の有無と内容

## 確認してほしい内容

### 1. メタ情報

- `title`
- `description`
- `metadataBase`
- OGP / Twitter Card
- canonical
- robots 関連

### 2. インデックス制御

- `public/robots.txt` もしくは `src/app/robots.ts`
- `sitemap.xml`
- 非本番時の noindex 方針

### 3. 見出し構造

- `h1` の有無
- `h2` 以降の階層

### 4. HTML構造・クローラビリティ

- `main`, `header`, `nav`, `footer`, `section` の使い方
- クローラーに伝わりにくい箇所の有無

### 5. 画像SEO

- `alt` の不足
- OGP画像の運用

### 6. URL設計

- static export 前提で不自然なURLがないか
- `?id=` ページの canonical 方針

### 7. 技術SEO

- `robots.ts` / `sitemap.ts` の導入要否
- `new URL()` を使うべき箇所
- ビルド後成果物の確認ポイント

## 出力形式

1. 総評
2. 優先度: 高
3. 優先度: 中
4. 優先度: 低
5. ページ別チェック
6. 不足している SEO 施策一覧
7. 修正に入る場合のおすすめ順
