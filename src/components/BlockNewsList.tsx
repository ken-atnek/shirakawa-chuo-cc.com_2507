/* =======================================
 * 熊本市中央公民館  お知らせ一覧
 * URL: src/components/BlockNewsList.tsx
 * Created: 2025-07-17
 * Last updated: 2025-07-17
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import { NewsItem } from '@/types/newsItem';
import ExternalLink from '@/components/common/ExternalLink';
import { stripHtmlExceptBr } from '@/lib/stripHtml';
type Props = {
  items: NewsItem[];
};

export default function BlockNewsList({ items }: Props) {
  return (
    <ul className={styles.newsList}>
      {items.map((item, index) => (
        <li key={index} className={styles.newsItem}>
          <p className={styles.date}>{formatDate(item.date)}</p>
          {(item.title || item.body || item.pdfLink) && (
            <div className={styles.wrapDetails}>
              {item.title && <h3 className={styles.title}>{item.title}</h3>}
              {item.body && <p className={styles.body} dangerouslySetInnerHTML={{ __html: stripHtmlExceptBr(item.body).replace(/\n/g, '<br />') }} />}
              {item.pdfLink && (
                <ExternalLink
                  aria-label={item.pdfTitle ?? 'PDFを開く'}
                  className={styles.itemPdf}
                  href={item.pdfLink}
                >
                  {item.pdfTitle ?? 'PDFを開く'}
                </ExternalLink>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}
