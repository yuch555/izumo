import Link from "next/link";
import { RecyclingMap } from "@/components/features/RecyclingMap";
import { ArrowBigLeftIcon } from "lucide-react";
import { getAllRecyclingStores } from "../../lib/recycling";

export const metadata = {
  title: "リサイクルステーション検索 | 出雲市",
  description: "出雲市のリサイクルステーションを地図から検索できます",
};

export default function RecyclingPage() {
  const stores = getAllRecyclingStores();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowBigLeftIcon size={16} className="inline-block mr-1" />
            ホームに戻る
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            ♻️ リサイクルステーション検索
          </h1>
          <p className="text-gray-600">
            出雲市内のリサイクルステーション（スーパー・店舗）を地図から探せます。
          </p>
        </div>

        <RecyclingMap stores={stores} />

        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            📝 リサイクル可能な品目について
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-green-700 mb-2">📄 紙類</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>ダンボール</li>
                <li>牛乳パック</li>
                <li>新聞</li>
                <li>雑誌類</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-2">🥤 プラスチック</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>白色トレイ</li>
                <li>白色以外のトレイ</li>
                <li>透明プラ容器</li>
                <li>ペットボトル</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-700 mb-2">🥫 缶・びん</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>スチール缶</li>
                <li>アルミ缶</li>
                <li>リターナブルびん</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
