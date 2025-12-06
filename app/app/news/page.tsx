import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch("http://localhost:3000/data/news.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.items;
}

export default async function NewsPage() {
  const newsItems = await getNews();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← ホームに戻る
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">📰 広報・お知らせ</h1>

        <div className="grid gap-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-2">
                {item.category && (
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {new Date(item.pubDate).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                詳細を見る →
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
