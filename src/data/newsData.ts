/* =======================================
 * 熊本市中央公民館 お知らせDATA
 * URL:src/data/newsData.ts
 * Created: 2025-07-17
 * Last updated: 2025-07-17
 * ======================================= */

import { NewsItem } from '@/types/newsItem';

export const newsData: NewsItem[] = [
  {
    pdfTitle: '「公民館だより」を7月号に更新しました。',
    pdfLink: '/data/pdf/R7.7月号公民館だより.pdf',
    date: '2025-07-01',
  },
  {
    pdfTitle: '「公民館だより」を6月号に更新しました。',
    pdfLink: '/data/pdf/R7.6月号公民館だより.pdf',
    date: '2025-06-01',
  },
  {
    body: '5月7日は定時休館になります。お間違えないようにお願いします。',
    pdfTitle: '「公民館だより」を5月号に更新しました。',
    pdfLink: '/data/pdf/R7.5月号公民館だより.pdf',
    date: '2025-05-01',
  },
];
