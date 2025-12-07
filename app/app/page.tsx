import { ArrowBigRightDash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getAllNews } from "../lib/news";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

async function getLatestNews() {
  const allNews = await getAllNews();
  return allNews.slice(0, 5); // 最新5件
}

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold my-2">出雲市お役立ちWEBサイト</h1>
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
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
