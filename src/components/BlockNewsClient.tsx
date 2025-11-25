'use client';
/* =======================================
 * ニュースデータ取得コンポーネント
 * 動的にAPIからデータを取得して NewsList に渡す
 * URL: src/components/news/NewsClient.tsx
 * Created: 2025-06-28
 * ======================================= */
import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNewsApi';
import { NewsItem } from '@/types/newsItem';
import BlockNewsList from '@/components/BlockNewsList';

//ニュース一覧を表示するコンポーネント
export default function TopNewsClient() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchNews(5)
      .then(({ news }) => {
        setItems(news);
      })
      .catch((err) => {
        console.error('トップニュース取得失敗:', err);
        setError('最新ニュースの取得に失敗しました');
      });
  }, []);
  //エラーハンドリング
  if (error) return <p>{error}</p>;
  if (!items.length) return <p>読み込み中...</p>;
  //応答
  return <BlockNewsList items={items} />;
}
