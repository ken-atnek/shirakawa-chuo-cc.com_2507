/* =======================================
 * ニュース 詳細ページ
 * URL: src/app/news/detail/page.tsx
 * Created: 2025-11-27
 * ======================================= */
import type { Metadata } from 'next';
import styles from '@/styles/PageTop.module.scss';
import NewsDetailClient from '@/components/NewsDetailClient';

type Props = {
  searchParams: {
    id?: string;
  };
};

// ニュース詳細ページ用メタデータ
export const generateMetadata = (): Metadata => {
  return {
    title: 'お知らせ詳細 | 熊本市中央公民館',
    description: '熊本市中央公民館からのお知らせ詳細ページです。',
  };
};

// /news/detail/?id=xxx
export default function NewsDetailPage({ searchParams }: Props) {
  const id = searchParams.id;

  if (!id) {
    return (
      <section className={styles.containerNewsDetails}>
        <article>
          <h2 className={styles.itemH2}>お知らせ</h2>
          <p>ニュースIDが指定されていません。</p>
        </article>
      </section>
    );
  }

  return (
    <section className={styles.containerNewsDetails}>
      <article>
        <h2 className={styles.itemH2}>お知らせ</h2>
        <NewsDetailClient id={id} />
      </article>
    </section>
  );
}
