import Link from "next/link";
import { NewsSearch } from "@/components/features/NewsSearch";
import { ArrowBigLeftIcon } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
};

async function getNews(): Promise<NewsItem[]> {
  try {
    // RSS APIから取得（5分間キャッシュ）
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/news`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error("ニュース取得エラー:", error);
    return [];
  }
}

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

        <h1 className="text-4xl font-bold my-2">広報・お知らせ</h1>

        <NewsSearch newsItems={newsItems} />
      </div>
    </main>
  );
}
