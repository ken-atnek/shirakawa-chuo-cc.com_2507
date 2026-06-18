## データ取得パターン

この repo は `output: 'export'` 前提ですが、ニュースは外部 API から取得している。  
そのため、参照元 repo の `public/db/*.json` 前提ルールはそのまま使わず、この構成に合わせて扱う。

### `force-dynamic` は使用しない

```ts
// NG
export const dynamic = 'force-dynamic';
```

`output: 'export'` と競合するため、ビルドエラーの原因になる。

### 現在の取得元

- 一覧: `src/lib/fetchNewsApi.ts`
- API: `https://shirakawa-chuo-cc.com/api/news/`

### 基本方針

- API取得ロジックは `src/lib/fetchNewsApi.ts` に寄せる
- ページやコンポーネント内に API URL を散らさない
- 失敗時は空配列や `null` を返し、呼び出し側で破綻しない形にする
- エラー文言やフォールバック表示は UI 側で判断する

### 補足

- `news/detail` のようにクエリ依存の画面では、static export 制約と `Suspense` 前提を崩さない
- 取得元やキャッシュ方針を変える時は、SEO ではなく描画要件もセットで確認する
