## Next.js 15 App Router の static export メモ

この repo は `output: 'export'` 前提です。  
SEO関連ファイルを追加するときは、通常の App Router 案件より制約を先に確認します。

### `robots.ts` / `sitemap.ts` を置く場合は `force-static` を明示する

`src/app/robots.ts` / `src/app/sitemap.ts` を追加する場合は、先頭に `export const dynamic = 'force-static';` を付ける。

#### 推奨

```ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
```

#### よくある症状

- `Failed to collect page data for /robots.txt`
- `export const dynamic = "force-static" ... not configured`

### `useSearchParams()` を使う client component は `Suspense` で包む

静的ビルド対象ページで `useSearchParams()` を使う場合は、page 側で `Suspense` 境界を用意する。

この repo では `src/app/news/detail/page.tsx` が該当するので、同じ前提を崩さないこと。

### URL生成は `new URL()` を使う

canonical / sitemap / robots 内の URL を文字列連結で作ると、`//` 混入や末尾スラッシュ差異が出やすい。

#### 推奨

```ts
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE || 'https://shirakawa-chuo-cc.com/'
);

const pageUrl = new URL('/entry/', metadataBase).toString();
```

### `public/robots.txt` と `src/app/robots.ts` を併用しない

- 片方を source of truth に決める
- App Router へ寄せるなら `public/robots.txt` は運用停止する
- `public/robots.txt` を残すなら `robots.ts` は追加しない

### 本番判定は repo 内でそろえる

- `NEXT_PUBLIC_IS_REAL_PROD` を基準にする
- `NEXT_PUBLIC_METADATA_BASE` も同じ公開URL基準で管理する
- 本番以外では `noindex` を返す方針を崩さない
