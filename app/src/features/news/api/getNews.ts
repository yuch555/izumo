import type { NewsResponse } from '../types';

// APIルートからニュースデータを取得（RSSまたはローカルJSON）
export async function getNews(): Promise<NewsResponse> {
  const response = await fetch('/api/news', {
    next: { revalidate: 300 }, // 5分間キャッシュ
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
}

// 最新のニュースを指定件数取得
export async function getLatestNews(limit: number = 5) {
  const data = await getNews();
  return data.items.slice(0, limit);
}

// カテゴリ別にニュースを取得
export async function getNewsByCategory(category: string) {
  const data = await getNews();
  return data.items.filter(item => item.category === category);
}
