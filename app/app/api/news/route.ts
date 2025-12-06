import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { NewsResponseSchema, type NewsItem } from '@/src/features/news/schemas';

// 出雲市の公式RSSフィードURL
const RSS_FEEDS = {
  emergency: 'https://www.city.izumo.shimane.jp/www/rss/kinkyu.rdf', // 災害・緊急情報
  topics: 'https://www.city.izumo.shimane.jp/www/rss/topics.rdf',    // 注目情報
  news: 'https://www.city.izumo.shimane.jp/www/rss/news.rdf',        // 新着情報
};

// RSSをパースしてJSON形式に変換
async function parseRSS(xmlText: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  
  const result = parser.parse(xmlText);
  const items: Omit<NewsItem, 'category'>[] = [];
  
  // RDF形式（RSS 1.0）とRSS 2.0形式の両方に対応
  const rssItems = 
    result?.['rdf:RDF']?.item ||  // RDF形式
    result?.rss?.channel?.item ||  // RSS 2.0形式
    [];
  
  const itemsArray = Array.isArray(rssItems) ? rssItems : [rssItems];
  
  for (const item of itemsArray) {
    if (!item) continue;
    
    // RDF形式とRSS 2.0形式の両方のフィールドに対応
    const title = item.title || item['dc:title'] || '';
    const description = item.description || item['dc:description'] || '';
    const link = item.link || item['@_rdf:about'] || '';
    const pubDate = item.pubDate || item['dc:date'] || new Date().toISOString();
    
    try {
      // 各アイテムを検証（categoryなし）
      const newsItem = {
        id: `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: typeof title === 'string' ? title : title?.['#text'] || '',
        description: (typeof description === 'string' ? description : description?.['#text'] || '').replace(/<[^>]*>/g, ''),
        link: typeof link === 'string' ? link : link?.['#text'] || '',
        pubDate: typeof pubDate === 'string' ? pubDate : pubDate?.['#text'] || new Date().toISOString(),
      };
      
      items.push(newsItem);
    } catch (validationError) {
      console.warn('アイテムの検証に失敗:', validationError, item);
      // 検証失敗したアイテムはスキップ
    }
  }
  
  return items;
}

export async function GET(request: Request) {
  console.log('🚀 /api/news エンドポイントが呼ばれました');
  
  try {
    const { searchParams } = new URL(request.url);
    const feedType = searchParams.get('type') || 'all'; // all, emergency, topics, news
    console.log('📋 フィードタイプ:', feedType);
    
    let allItems: NewsItem[] = [];
    
    // 指定されたフィードまたは全フィードを取得
    const feedsToFetch = feedType === 'all' 
      ? Object.entries(RSS_FEEDS)
      : [[feedType, RSS_FEEDS[feedType as keyof typeof RSS_FEEDS]]];
    
    // 複数のRSSフィードを並行取得
    const results = await Promise.allSettled(
      feedsToFetch.map(async ([type, url]) => {
        if (!url) return [];
        
        console.log(`🔍 RSS取得開始: ${type} - ${url}`);
        
        const response = await fetch(url, {
          next: { revalidate: 300 }, // 5分間キャッシュ
        });
        
        if (!response.ok) {
          console.warn(`❌ RSS取得失敗 (${type}):`, response.status, response.statusText);
          return [];
        }
        
        const xmlText = await response.text();
        console.log(`✓ XMLテキスト取得成功 (${type}):`, xmlText.substring(0, 100) + '...');
        const items = await parseRSS(xmlText);
        console.log(`✓ パース成功 (${type}): ${items.length}件`);
        
        // カテゴリを追加
        return items.map((item): NewsItem => ({
          ...item,
          category: type === 'emergency' ? '災害・緊急情報' 
              : type === 'topics' ? '注目情報' 
              : '新着情報',
        }));
      })
    );
    
    // 成功した結果を統合
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        allItems = [...allItems, ...result.value];
      }
    });
    
    // 日付順にソート(新しい順)
    allItems.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
    
    // デバッグ用: RSS取得結果をログ出力
    console.log('📰 RSS取得結果:', {
      totalItems: allItems.length,
      feedTypes: [...new Set(allItems.map(item => item.category))],
      latestItems: allItems.slice(0, 3).map(item => ({
        title: item.title,
        category: item.category,
        pubDate: item.pubDate,
      }))
    });
    
  // アイテムがない場合はフォールバック
  if (allItems.length === 0) {
    const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data/news.json`);
    const fallbackData = await fallbackResponse.json();
    
    // フォールバックデータも検証
    const validatedFallback = NewsResponseSchema.parse(fallbackData);
    console.log('⚠️ RSS取得失敗のためフォールバックデータを使用');
    return NextResponse.json(validatedFallback);
  }
  
  // レスポンスデータを作成
  const responseData = {
    items: allItems,
    lastUpdated: new Date().toISOString(),
  };
  
  const validatedResponse = NewsResponseSchema.parse(responseData);
    console.log('✅ RSS検証成功:', {
      itemCount: validatedResponse.items.length,
      lastUpdated: validatedResponse.lastUpdated,
    });
    
    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('RSS取得エラー:', error);
    
    // エラー時はローカルJSONにフォールバック
    try {
      const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data/news.json`);
      const fallbackData = await fallbackResponse.json();
      
      // フォールバックデータも検証
      const validatedFallback = NewsResponseSchema.parse(fallbackData);
      console.log('⚠️ エラーハンドリング: フォールバックデータを使用');
      return NextResponse.json(validatedFallback);
    } catch (fallbackError) {
      console.error('❌ フォールバックエラー:', fallbackError);
      return NextResponse.json(
        { error: 'ニュースの取得に失敗しました' },
        { status: 500 }
      );
    }
  }
}
