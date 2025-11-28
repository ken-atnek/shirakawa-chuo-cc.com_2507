/* =======================================
 * ニュース 詳細ページ
 * URL: src/app/news/detail/page.tsx
 * Created: 2025-11-27
 * ======================================= */
import type { Metadata } from 'next';
import { Suspense } from 'react';
import styles from '@/styles/PageTop.module.scss';
import NewsDetailClient from '@/components/NewsDetailClient';

// ニュース詳細ページ用メタデータ
export const generateMetadata = (): Metadata => {
  return {
    title: 'お知らせ詳細 | 熊本市中央公民館',
    description: '熊本市中央公民館からのお知らせ詳細ページです。',
  };
};

// /news/detail/?id=xxx
export default function NewsDetailPage() {
  return (
    <section className={styles.containerNewsDetails}>
      <h2 className={styles.itemH2}>お知らせ</h2>
      {/* id はクライアント側で取得 */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <NewsDetailClient />
      </Suspense>
    </section>
  );
}
