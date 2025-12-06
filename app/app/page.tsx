import { ArrowBigRightDash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { XMLParser } from "fast-xml-parser";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
};

// 出雲市の公式RSSフィードURL
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

async function getLatestNews(): Promise<NewsItem[]> {
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

    return allItems.slice(0, 5); // 最新5件
  } catch (error) {
    console.error("ニュース取得エラー:", error);
    return [];
  }
}

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold my-2">出雲市お役立ちWEBサイト</h1>
          <p className="text-gray-600">市民の皆様へのお知らせをお届けします</p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">最新のお知らせ</h2>
            <Link
              href="/news"
              className="font-medium group flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              すべてのお知らせ
              <ArrowBigRightDash className="inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {latestNews.length === 0 ? (
            <p className="text-gray-500">お知らせはありません</p>
          ) : (
            <div className="grid gap-2">
              {latestNews.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border rounded-lg p-2 hover:shadow-md hover:scale-[1.01] transition-all group"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-center mb-2 gap-2">
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.pubDate).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-blue-600">
                    <span className="group-hover:underline">サイトを見る</span>
                    <ExternalLink
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
