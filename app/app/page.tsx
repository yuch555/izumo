import { Trash2, Newspaper, Recycle } from "lucide-react";
import Link from "next/link";
import { getAllNews } from "../lib/news";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

async function getLatestNews() {
  const allNews = await getAllNews();
  return allNews.slice(0, 5); // 最新5件
}

export default async function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold my-2">出雲市お役立ちWEBサイト</h1>
        </section>

        {/* 主要機能カード */}
        <section className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/garbage"
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Trash2 size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  ゴミ分別検索
                </h2>
                <p className="text-gray-600">品目から簡単検索</p>
              </div>
            </div>
            <p className="text-gray-700">
              ゴミの分け方・出し方を簡単に検索できます。50音順での検索や分別区分での絞り込みが可能です。
            </p>
          </Link>

          <Link
            href="/recycling"
            className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-cyan-500 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Recycle size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  リサイクルステーション
                </h2>
                <p className="text-gray-600">店舗を地図から探す</p>
              </div>
            </div>
            <p className="text-gray-700">
              スーパーや店舗のリサイクルステーションを地図から検索。紙類・プラスチック・缶びんなど。
            </p>
          </Link>

          <Link
            href="/news"
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Newspaper size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  お知らせ一覧
                </h2>
                <p className="text-gray-600">最新情報をチェック</p>
              </div>
            </div>
            <p className="text-gray-700">
              出雲市からの最新のお知らせや重要な情報を確認できます。カテゴリー別に検索も可能です。
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
