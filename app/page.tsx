import { PopulationStats } from "@/components/features/PopulationStats";
import { Trash2, Newspaper, Recycle, Building2 } from "lucide-react";
import Link from "next/link";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4"
            style={{ wordBreak: "auto-phrase" }}
          >
            出雲市お役立ちWEBサイト
          </h1>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 mb-2"
            style={{ wordBreak: "auto-phrase" }}
          >
            出雲市での生活をもっと便利に。
          </p>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 mb-6"
            style={{ wordBreak: "auto-phrase" }}
          >
            最新のお知らせ情報をかんたんに検索できます。
          </p>
        </section>

        {/* 主要機能カード */}
        <section className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/garbage"
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-2 border-green-200 dark:border-green-700 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-500 dark:bg-green-600 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Trash2 size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  ゴミ分別検索
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  品目から簡単検索
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              ゴミの分け方・出し方を簡単に検索できます。50音順での検索や分別区分での絞り込みが可能です。
            </p>
          </Link>

          <Link
            href="/recycling"
            className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800/50 border-2 border-cyan-200 dark:border-cyan-700 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-cyan-500 dark:bg-cyan-600 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Recycle size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  リサイクルステーション
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  店舗を地図から探す
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              スーパーや店舗のリサイクルステーションを地図から検索。紙類・プラスチック・缶びんなど。
            </p>
          </Link>

          <Link
            href="/news"
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Newspaper size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  お知らせ一覧
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  最新情報をチェック
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              出雲市からの最新のお知らせや重要な情報を確認できます。カテゴリー別に検索も可能です。
            </p>
          </Link>

          <Link
            href="/fiscal"
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-emerald-500 dark:bg-emerald-600 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform">
                <Building2 size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  財政状況
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  予算・決算を可視化
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              出雲市の財政状況を分かりやすくグラフで表示。歳入歳出、基金残高、職員数などを確認できます。
            </p>
          </Link>
        </section>

        {/* 住民統計セクション */}
        <section className="mb-12">
          <PopulationStats />
        </section>
      </div>
    </main>
  );
}
