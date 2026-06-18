## チェックリスト

作業開始前に確認:

- [ ] `next.config.ts` に `output: 'export'` がある
- [ ] `src/app/layout.tsx` の本番判定が `NEXT_PUBLIC_IS_REAL_PROD` 基準で崩れていない
- [ ] `public/robots.txt` と `src/app/robots.ts` を二重管理していない
- [ ] `useSearchParams()` を使うページは `Suspense` 境界に入っている
- [ ] URL生成が必要な箇所で文字列連結をしていない
- [ ] canonical の実装有無を source と `out/*.html` の両方で確認している
- [ ] `'use client'` ページが layout の共通 metadata をそのまま継承していないか確認している
- [ ] SEO 修正時に `out/robots.txt` `out/sitemap.xml` まで確認対象にしている
