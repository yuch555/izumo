import {
  Trash2,
  Newspaper,
  Recycle,
  Building2,
  Car,
  Users,
  ExternalLink,
  Database,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { HeroSlider } from "@/components/features/HeroSlider";

// ISR: 1時間ごとに再生成
export const revalidate = 3600;

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヒーロー画像スライダー */}
        <HeroSlider />

        {/* 6つのグリッドカード */}
        <section className="mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* 住民統計 */}
          <Link
            href="/statistics"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
          >
            <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              住民統計
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              人口・世帯数データ
            </p>
          </Link>

          {/* 駐車場 */}
          <Link
            href="/parking"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 transition-all group"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              駐車場
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              リアルタイム空き情報
            </p>
          </Link>

          {/* ゴミ分別 */}
          <Link
            href="/garbage"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-green-200 dark:hover:border-green-700 transition-all group"
          >
            <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Trash2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              ゴミ分別
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              品目から簡単検索
            </p>
          </Link>

          {/* リサイクル */}
          <Link
            href="/recycling"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-cyan-200 dark:hover:border-cyan-700 transition-all group"
          >
            <div className="bg-cyan-100 dark:bg-cyan-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Recycle className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              リサイクル
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ステーション検索
            </p>
          </Link>

          {/* お知らせ */}
          <Link
            href="/news"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-700 transition-all group"
          >
            <div className="bg-orange-100 dark:bg-orange-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Newspaper className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              お知らせ
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              最新情報をチェック
            </p>
          </Link>

          {/* 公共施設 */}
          <Link
            href="/facilities"
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 transition-all group"
          >
            <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              公共施設
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              施設一覧を検索
            </p>
          </Link>
        </section>

        {/* 下部リンクカード */}
        <section className="space-y-3">
          {/* 出雲市公式サイト */}
          <a
            href="https://www.city.izumo.shimane.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  出雲市公式サイト
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  公式情報はこちら
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* オープンデータカタログ */}
          <a
            href="https://shimane-opendata.jp/datasets?organization_id=10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/50 w-10 h-10 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  オープンデータカタログ
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  データ利活用に
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* 財政状況 */}
          <Link
            href="/fiscal"
            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-10 h-10 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  財政状況
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  予算・決算を可視化
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* フッター */}
        <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>本サイトは出雲市オープンデータを活用した非公式サイトです</p>
        </footer>
      </div>
    </main>
  );
}
