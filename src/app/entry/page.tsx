/* =======================================
 * 熊本市中央公民館 応募フォームページ
 * URL: /src/app/entry/page.tsx
 * Referenced in: /src/app/entry/page.tsx
 * Created: 2026-03-26
 * Last updated: 2026-06-18
 * ======================================= */

import type { Metadata } from 'next';
import EntryPageClient from './EntryPageClient';

export const metadata: Metadata = {
  title: '講座・催しのお申込み | 熊本市中央公民館',
  description: '熊本市中央公民館の講座・催しへのお申込みはこちらから。',
  alternates: {
    canonical: '/entry/',
  },
};

export default function EntryPage() {
  return <EntryPageClient />;
}
