import Link from "next/link";

export default function MapPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← ホームに戻る
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">🗺️ 地図で探す</h1>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-blue-800">
            地図機能は今後実装予定です。Google Maps
            APIやOpenStreetMapを使用して施設や避難所を地図上に表示します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">実装予定の機能</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🗺️ インタラクティブな地図表示</li>
              <li>避難所のマーカー表示</li>
              <li>❤️ AED設置場所のマーカー表示</li>
              <li>🏛️ 公共施設のマーカー表示</li>
              <li>🔍 現在地からの検索機能</li>
              <li>📱 ルート案内</li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">使用予定の技術</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Google Maps API</li>
              <li>• OpenStreetMap</li>
              <li>• Leaflet.js</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
