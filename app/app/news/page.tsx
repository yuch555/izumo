import Link from "next/link";
import { NewsSearch } from "../../src/components/features/NewsSearch";
import { ArrowBigLeftIcon } from "lucide-react";
import { getAllNews } from "../../lib/news";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function NewsPage() {
  const newsItems = await getAllNews();

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
