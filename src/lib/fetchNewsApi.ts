import { NewsItem } from '@/types/newsItem';

type ApiNewsItem = {
  k_id: number | string;
  k_date?: string;
  k_title: string;
  k_body?: string | null;
  k_pdf_title?: string | null;
  k_pdf?: string | null;
  k_total?: number;
};

export async function fetchNews(
  limit = 3,
  offset = 0,
  apiUrl = `https://shirakawa-chuo-cc.com/api/news/?limit=${limit}&offset=${offset}`
): Promise<{ news: NewsItem[]; total: number }> {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.error(`ニュースAPIエラー (${res.status})`);
      return { news: [], total: 0 };
    }
    const rawData: ApiNewsItem[] = await res.json();
    const total = rawData.length > 0 && rawData[0].k_total ? Number(rawData[0].k_total) : 0;
    const news: NewsItem[] = rawData.map((item) => ({
      id: String(item.k_id),
      title: item.k_title,
      body: item.k_body || '',
      pdfTitle: item.k_pdf_title || '',
      pdfLink: item.k_pdf || '',
      date: item.k_date || '',
    }));
    //応答
    return { news, total };
  } catch (err) {
    console.error('fetchNews取得失敗:', err);
    return { news: [], total: 0 };
  }
}
