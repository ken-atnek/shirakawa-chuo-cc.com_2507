# AGENTS.md

## 基本方針

このプロジェクトは既存サイトの運用・改善前提です。  
実装を広げすぎず、現在の構成を尊重しながら、必要な修正だけを積み上げます。

---

## 作業開始時の確認順

1. `AGENTS.md`
2. `docs/PAGE_STRUCTURE.md`
3. `docs/seo/SEO_SETUP.md`
4. `docs/rules/tsx-comment-rules.md`（`tsx` 編集時）
5. `docs/rules/scss-comment-rules.md`（`scss` 編集時）
6. `docs/rules/coding-style.md`
7. `docs/rules/nextjs-export.md`
8. `docs/rules/fetch-pattern.md`
9. `docs/rules/ui-interactions.md`
10. `docs/rules/checklist.md`
11. `docs/rules/project-setup.md`
12. `docs/seo/SEO_AUDIT_REQUEST_TEMPLATE.md`
13. `docs/seo/SEO_FIX_TRACKER_TEMPLATE.md`

---

## 作業方針

- まず現状確認を行う
- 既存ページと既存導線を前提に判断する
- 大幅な設計変更や作り直しはしない
- 変更は最小単位で進める
- SEO は source だけでなく最終出力も意識する

---

## この repo で特に意識すること

- `output: 'export'` 前提の挙動を崩さない
- `public/robots.txt` と App Router の `robots.ts` を二重管理しない
- URL 生成が必要な場合は文字列連結より `new URL()` を優先する
- 本番判定は `NEXT_PUBLIC_IS_REAL_PROD` を基準にそろえる
- OGP / canonical / sitemap / robots は同じ公開URL基準でそろえる

---

## 注意点

- まずは SEO の土台整理を優先する
- 依頼範囲外の見た目改修までは広げない
- ドキュメント追加後は、今後の読み順が崩れないように維持する
