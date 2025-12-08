import { BackToHome } from "@/components/base/BackToHome";
import { NewsSearch } from "@/components/features/NewsSearch";
import { getAllNews } from "~/lib/news";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function NewsPage() {
  const newsItems = await getAllNews();

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <BackToHome />

        <h1 className="text-4xl font-bold my-2 text-gray-800 dark:text-gray-100">
          お知らせ
        </h1>

        <NewsSearch newsItems={newsItems} />
      </div>
    </main>
  );
}
