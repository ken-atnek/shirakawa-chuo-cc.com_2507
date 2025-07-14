/* =======================================
 * 熊本市中央公民館 TOPページ
 * URL: /app/page.tsx
 * Created: 2025-07-11
 * Last updated: 2025-07-11
 * ======================================= */

import type { Metadata } from 'next';
import styles from '@/styles/PageTop.module.scss';

export const generateMetadata = (): Metadata => {
  return {
    title: '熊本市中央公民館',
    description:
      '熊本市中央公民館は図書館から会議室、ホールまで幅広くご利用いただける施設です。',
  };
};
export default function Home() {
  return <></>;
}
