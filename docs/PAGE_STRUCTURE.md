# ページ構成メモ

既存実装をもとにしたページ構成メモです。  
新規ページを増やす前に、まず現在の導線と責務を確認します。

---

## ルート一覧

| ページ | パス | 役割 |
|---|---|---|
| トップページ | `/` | 施設案内・講座案内・アクセスなどのメイン導線 |
| 応募フォーム | `/entry/` | 講座応募フォーム |
| お知らせ詳細 | `/news/detail/` | ニュース詳細表示 |

---

## トップページ `/`

`src/app/page.tsx`

| # | セクション | 内容 |
|---|---|---|
| 1 | Hero | メインビジュアル |
| 2 | News | お知らせ一覧、講座募集導線 |
| 3 | Course Guide | 講座案内 |
| 4 | Facility Guide | 施設案内 |
| 5 | Facility Details | 利用案内、料金、定員 |
| 6 | Facility Hours | 利用可能時間 |
| 7 | Access | アクセス |
| 8 | Tearoom | 白川公園茶室案内 |
| 9 | Store | 喫茶・売店案内 |

---

## 応募フォーム `/entry/`

`src/app/entry/page.tsx`

- 講座種別選択
- 受講希望講座
- 申込者情報入力
- 郵便番号から住所補完
- 確認画面
- `backend/contact.php` 送信

SEO というより運用導線のページなので、index 可否や canonical の扱いは都度判断する。

---

## お知らせ詳細 `/news/detail/`

`src/app/news/detail/page.tsx`

- クエリ `?id=` でニュース詳細を表示
- 本体描画は `NewsDetailClient`
- `useSearchParams()` 利用ページなので `Suspense` 境界維持が前提

一覧ページを持たない構成なので、内部リンク導線や title の付け方を崩さないこと。
