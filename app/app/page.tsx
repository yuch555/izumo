import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">出雲市お役立ちWEBサイト</h1>
          <p className="text-lg text-gray-600">
            出雲市の情報をわかりやすくお届けします
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 避難所情報 */}
          <Link
            href="/shelters"
            className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">🏢 避難所情報</h2>
            <p className="text-gray-600">市内の指定避難所を確認できます</p>
          </Link>

          {/* AED設置場所 */}
          <Link
            href="/aeds"
            className="block p-6 bg-red-50 rounded-lg hover:bg-red-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">❤️ AED設置場所</h2>
            <p className="text-gray-600">緊急時のAED設置場所を検索</p>
          </Link>

          {/* 公共施設 */}
          <Link
            href="/facilities"
            className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">🏛️ 公共施設</h2>
            <p className="text-gray-600">図書館・体育館など公共施設情報</p>
          </Link>

          {/* 広報・お知らせ */}
          <Link
            href="/news"
            className="block p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">📰 広報・お知らせ</h2>
            <p className="text-gray-600">市からの最新のお知らせ</p>
          </Link>

          {/* 統計情報 */}
          <Link
            href="/statistics"
            className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">📊 統計情報</h2>
            <p className="text-gray-600">人口・産業などの統計データ</p>
          </Link>

          {/* マップ */}
          <Link
            href="/map"
            className="block p-6 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
          >
            <h2 className="text-2xl font-bold mb-2">🗺️ 地図で探す</h2>
            <p className="text-gray-600">施設や避難所を地図で確認</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
