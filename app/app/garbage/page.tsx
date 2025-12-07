import Link from "next/link";
import { ArrowBigLeftIcon, Trash2 } from "lucide-react";
import { GarbageSearch } from "../../src/components/features/GarbageSearch";
import { getAllGarbageItems } from "../../lib/garbage";

export const metadata = {
  title: "ゴミ分別検索 | 出雲市",
  description: "出雲市のゴミ分別方法を簡単に検索できます",
};

export default function GarbagePage() {
  const garbageItems = getAllGarbageItems();

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowBigLeftIcon size={16} className="inline-block mr-1" />
            ホームに戻る
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center gap-3">
            <Trash2 className="text-green-600" size={40} />
            ゴミ分別検索
          </h1>
          <p className="text-gray-600">
            出雲市のゴミの分け方・出し方を簡単に検索できます。品目名を入力するか、分別区分で絞り込んでください。
          </p>
        </div>

        <GarbageSearch garbageItems={garbageItems} />
      </div>
    </main>
  );
}
