# SEO修正トラッカー

## ステータス定義

- `未着手`
- `対応中`
- `対応済み`
- `保留`
- `対応不要`

## 管理テーブル

| ID | 優先度 | 指摘内容 | 対象ページ/URL | 対象ファイル | 対応方針 | ステータス | 担当 | 期限 | 備考 |
|---|---|---|---|---|---|---|---|---|---|
| SEO-001 | 高 | 例: `robots.txt` の本番内容確認 | `/robots.txt` | `public/robots.txt` |  | 未着手 |  |  |  |

## 実装ログ

### YYYY-MM-DD

- 対応ID:
- 実施内容:
- 変更ファイル:
- 確認方法:
- 結果:

## 保留事項

- `public/robots.txt` と App Router `robots.ts` のどちらを正にするか
- `news/detail/?id=` の index / canonical 方針

## 次回レビュー時チェック

- `title` / `description`
- canonical
- `robots.txt` / `sitemap.xml`
- `h1` と見出し階層
- 画像 `alt`
- 構造化データ
