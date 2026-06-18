## プロジェクト設定メモ

## 概要

Next.js 15 App Router + TypeScript + SCSS による static export 前提の既存サイト運用 repo。

## この repo で確認する設定

### `next.config.ts`

- `output: 'export'`
- `trailingSlash: true`
- `images: { unoptimized: true }`
- `sassOptions.includePaths`

### package scripts

- `build` は `next build` 後に 404 出力を調整している
- SCSS チェックは `lint:style`

### 環境変数

- `NEXT_PUBLIC_IS_REAL_PROD`
- `NEXT_PUBLIC_METADATA_BASE`

SEO や公開URLに関わる修正では、この2つを先に確認する。

## 補足

- 既存 repo なので `create-next-app` 前提の説明は不要
- 設定変更は他ファイルへの影響を見ながら最小単位で行う
