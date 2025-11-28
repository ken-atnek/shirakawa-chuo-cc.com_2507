'use client';
/* =======================================
 * ニュース詳細取得コンポーネント
 * URL: src/components/NewsDetailClient.tsx
 * Created: 2025-11-27
 * ======================================= */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/PageTop.module.scss';
import { NewsItem } from '@/types/newsItem';
import ExternalLink from '@/components/common/ExternalLink';
import { fetchNewsById } from '@/lib/fetchNewsApi';

export default function NewsDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? undefined;

  const [item, setItem] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchNewsById(id)
      .then((news) => {
        if (!news) {
          setError('該当するニュースが見つかりませんでした。');
          return;
        }
        setItem(news);
      })
      .catch((err) => {
        console.error('ニュース詳細取得失敗:', err);
        setError(
          'ニュースの取得に失敗しました。時間をおいて再度お試しください。'
        );
      });
  }, [id]);

  if (!id) {
    return <p>ニュースIDが指定されていません。</p>;
  }

  if (error) return <p>{error}</p>;
  if (!item) return <p>読み込み中...</p>;

  return (
    <article className={styles.newsDetail}>
      <p className={styles.date}>{formatDate(item.date)}</p>
      {item.title && <h3 className={styles.title}>{item.title}</h3>}

      {item.body && (
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      )}

      {item.pdfLink && (
        <p>
          <ExternalLink
            href={item.pdfLink}
            aria-label={item.pdfTitle ?? 'PDFを開く'}
            className={styles.itemPdf}
          >
            {item.pdfTitle ?? 'PDFを開く'}
          </ExternalLink>
        </p>
      )}
    </article>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}
