import Link from "next/link";
import { NewsSearch } from "../../src/components/features/NewsSearch";
import { ArrowBigLeftIcon } from "lucide-react";
import { XMLParser } from "fast-xml-parser";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
};

// の公式RSSフィードURL
const RSS_FEEDS = {
  emergency: "https://www.city.izumo.shimane.jp/www/rss/kinkyu.rdf",
  topics: "https://www.city.izumo.shimane.jp/www/rss/topics.rdf",
  news: "https://www.city.izumo.shimane.jp/www/rss/news.rdf",
};

async function parseRSS(
  xmlText: string,
  category: string
): Promise<NewsItem[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  const result = parser.parse(xmlText);
  const items: NewsItem[] = [];

  const rssItems =
    result?.["rdf:RDF"]?.item || result?.rss?.channel?.item || [];

  const itemsArray = Array.isArray(rssItems) ? rssItems : [rssItems];

  for (const item of itemsArray) {
    if (!item) continue;

    const title = item.title || item["dc:title"] || "";
    const description = item.description || item["dc:description"] || "";
    const link = item.link || item["@_rdf:about"] || "";
    const pubDate = item.pubDate || item["dc:date"] || new Date().toISOString();

    items.push({
      id: `${category}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      title: typeof title === "string" ? title : title?.["#text"] || "",
      description: (typeof description === "string"
        ? description
        : description?.["#text"] || ""
      ).replace(/<[^>]*>/g, ""),
      link: typeof link === "string" ? link : link?.["#text"] || "",
      pubDate:
        typeof pubDate === "string"
          ? pubDate
          : pubDate?.["#text"] || new Date().toISOString(),
      category,
    });
  }

  return items;
}

async function getNews(): Promise<NewsItem[]> {
  try {
    const allItems: NewsItem[] = [];

    // 各RSSフィードを並行で取得
    const results = await Promise.allSettled([
      fetch(RSS_FEEDS.emergency)
        .then((res) => res.text())
        .then((text) => parseRSS(text, "emergency")),
      fetch(RSS_FEEDS.topics)
        .then((res) => res.text())
        .then((text) => parseRSS(text, "topics")),
      fetch(RSS_FEEDS.news)
        .then((res) => res.text())
        .then((text) => parseRSS(text, "news")),
    ]);

    for (const result of results) {
      if (result.status === "fulfilled") {
        allItems.push(...result.value);
      }
    }

    // 日付でソート
    allItems.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return allItems;
  } catch (error) {
    console.error("ニュース取得エラー:", error);
    return [];
  }
}

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600">
            <ArrowBigLeftIcon size={16} className="inline-block mr-1" />
            ホームに戻る
          </Link>
        </div>

        <h1 className="text-4xl font-bold my-2">お知らせ</h1>

        <NewsSearch newsItems={newsItems} />
      </div>
    </main>
  );
}
