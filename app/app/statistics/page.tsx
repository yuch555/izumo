import { BackToHome } from "../../src/components/base/BackToHome";

export default function StatisticsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6"></div>

        <h1 className="text-4xl font-bold mb-8">📊 統計情報</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            統計情報は今後実装予定です。「統計でみる出雲」のデータをパースして表示します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">実装予定の統計データ</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 人口推移</li>
              <li>✓ 年齢別人口</li>
              <li>✓ 地域別人口</li>
              <li>✓ 産業統計</li>
              <li>✓ 教育統計</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">データソース</h2>
            <p className="text-gray-700">
              「統計でみる出雲」PDFから必要な部分をパースして表示予定
            </p>
            <p className="text-sm text-gray-500 mt-2">更新頻度: 年1回</p>
          </div>
        </div>
      </div>
    </main>
  );
}
