# SEO設定メモ

このファイルは、`shirakawa-chuo-cc.com` の既存サイト改善向け SEO メモです。  
新規構築ではなく、現在の実装状態を確認しながら不足分だけ整えます。

---

## サイト基本情報

- サイト名: 熊本市中央公民館
- ドメイン: `shirakawa-chuo-cc.com`
- 公開URL: `https://shirakawa-chuo-cc.com/`
- 運用前提: Next.js App Router + static export

---

## 現在の実装確認ポイント

### 既存ファイル

- `src/app/layout.tsx`
  - `NEXT_PUBLIC_IS_REAL_PROD` で本番判定
  - 本番時のみ `metadataBase` / `openGraph` を設定
  - `robots` を本番・非本番で切り替え
- `src/app/page.tsx`
  - トップページの `title` / `description` を設定
- `src/app/news/detail/page.tsx`
  - お知らせ詳細ページの `title` / `description` を設定
- `public/robots.txt`
  - 現状は `Disallow:` のみ
- `public/ogp.jpg`
  - OGP画像として利用

### 現時点の注意

- `public/robots.txt` を使い続けるのか、`src/app/robots.ts` に寄せるのかを途中で混在させない
- `sitemap.ts` は未整備なら追加検討が必要
- 静的出力案件なので、修正後は `out/robots.txt` `out/sitemap.xml` まで確認対象にする

---

## 優先してそろえる SEO 項目

1. `title`
2. `description`
3. canonical
4. OGP / Twitter Card
5. `robots.txt`
6. `sitemap.xml`
7. 必要に応じた構造化データ

---

## 本番 / 非本番の切り替え方針

- 判定は `NEXT_PUBLIC_IS_REAL_PROD` を使う
- 公開URL基準は `NEXT_PUBLIC_METADATA_BASE` でそろえる
- 本番時だけ indexable な設定を返す
- 非本番時は `noindex` / `nofollow` を返す

### 基本方針

- `metadataBase` は本番時だけ設定する
- OGP URL や canonical の基準URLも本番時だけ有効にする
- 非本番URLを正規URLとして検索エンジンに渡さない
- GA4 などの計測タグを入れる場合も本番時だけ有効化する

---

## `robots` / `sitemap` の実装方針

### `public/robots.txt` を使う場合

- `public/robots.txt` を単一 source of truth にする
- App Router 側の `robots.ts` は増やさない
- 本番 / 非本番で内容を変えたい場合は、生成方法を別途整理する

### `src/app/robots.ts` / `src/app/sitemap.ts` を使う場合

- `export const dynamic = 'force-static';` を必ず付ける
- `public/robots.txt` は二重管理になるので削除または運用停止する
- URL生成は文字列連結ではなく `new URL(path, metadataBase).toString()` を使う
- `sitemap.ts` は本番時だけURLを返し、非本番時は空配列にする

---

## canonical / URL生成ルール

- `NEXT_PUBLIC_METADATA_BASE` は末尾 `/` の有無に依存しないように扱う
- `https://example.com//path` のような重複スラッシュを避ける
- URL連結は `new URL()` を使う

### 例

```ts
const metadataBase = new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://shirakawa-chuo-cc.com/');
const canonical = new URL('/news/detail/', metadataBase).toString();
```

---

## ページ別メモ

### トップページ `/`

- `src/app/page.tsx` で `generateMetadata()` 管理
- 施設の役割が伝わる `description` を維持する
- OGP画像は `public/ogp.jpg` を基準にする

### 応募フォーム `/entry/`

- 申込導線ページなので、index させるかは運用判断
- index 対象にする場合も、薄いページにならない説明文を用意する

### お知らせ詳細 `/news/detail/`

- 一覧を持たないクエリページなので canonical 方針を先に決める
- `?id=` ページを index させるなら title の個別化も検討する

---

## 今後の確認候補

- `src/app/sitemap.ts` の追加要否
- `public/robots.txt` の本番内容見直し
- `metadata` に `twitter` を追加するか
- `news/detail` の canonical / noindex 方針
- 主要セクションの見出し階層と `alt` の再確認
