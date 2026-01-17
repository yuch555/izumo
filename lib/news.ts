import { XMLParser } from 'fast-xml-parser';

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
};

// 出雲市の公式RSSフィードURL
const RSS_FEEDS = {
  emergency: 'https://www.city.izumo.shimane.jp/www/rss/kinkyu.rdf',
  topics: 'https://www.city.izumo.shimane.jp/www/rss/topics.rdf',
  news: 'https://www.city.izumo.shimane.jp/www/rss/news.rdf',
} as const;

async function parseRSS(xmlText: string, category: string): Promise<NewsItem[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  
  try {
    const result = parser.parse(xmlText);
    const items: NewsItem[] = [];
    
    const rssItems = 
      result?.['rdf:RDF']?.item ||
      result?.rss?.channel?.item ||
      [];
    
    const itemsArray = Array.isArray(rssItems) ? rssItems : [rssItems];
    
    for (const item of itemsArray) {
      if (!item) continue;
      
      const title = item.title || item['dc:title'] || '';
      const description = item.description || item['dc:description'] || '';
      const link = item.link || item['@_rdf:about'] || '';
      const pubDate = item.pubDate || item['dc:date'] || new Date().toISOString();
      
      items.push({
        id: `${category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: typeof title === 'string' ? title : title?.['#text'] || '',
        description: (typeof description === 'string' ? description : description?.['#text'] || '').replace(/<[^>]*>/g, ''),
        link: typeof link === 'string' ? link : link?.['#text'] || '',
        pubDate: typeof pubDate === 'string' ? pubDate : pubDate?.['#text'] || new Date().toISOString(),
        category,
      });
    }
    
    return items;
  } catch (error) {
    console.error(`RSS解析エラー (${category}):`, error);
    return [];
  }
}

export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const allItems: NewsItem[] = [];
    
    // 各RSSフィードを並行で取得
    const results = await Promise.allSettled([
      fetch(RSS_FEEDS.emergency, { 
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000)
      })
        .then(res => res.ok ? res.text() : Promise.reject('Failed to fetch'))
        .then(text => parseRSS(text, 'emergency')),
      
      fetch(RSS_FEEDS.topics, { 
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000)
      })
        .then(res => res.ok ? res.text() : Promise.reject('Failed to fetch'))
        .then(text => parseRSS(text, 'topics')),
      
      fetch(RSS_FEEDS.news, { 
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000)
      })
        .then(res => res.ok ? res.text() : Promise.reject('Failed to fetch'))
        .then(text => parseRSS(text, 'news')),
    ]);
    
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
      } else {
        console.error('RSS取得エラー:', result.reason);
      }
    }
    
    // 日付でソート
    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    return allItems;
  } catch (error) {
    console.error("ニュース取得エラー:", error);
    return [];
  }
}
