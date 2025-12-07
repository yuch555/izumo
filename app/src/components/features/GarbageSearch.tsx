"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Trash2, AlertCircle } from "lucide-react";
import type { GarbageItem } from "../../../lib/garbage";
import { garbageCategories } from "../../../lib/garbage";

interface GarbageSearchProps {
  garbageItems: GarbageItem[];
}

export function GarbageSearch({ garbageItems }: GarbageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");

  const filteredItems = useMemo(() => {
    let items = garbageItems;

    // カテゴリーでフィルタリング
    if (selectedCategory && selectedCategory !== "すべて") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // 検索クエリでフィルタリング
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          (item.kana && item.kana.includes(lowerQuery))
      );
    }

    return items;
  }, [garbageItems, searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      燃えるごみ: "bg-red-100 text-red-800 border-red-300",
      破砕ごみ: "bg-yellow-100 text-yellow-800 border-yellow-300",
      埋立ごみ: "bg-gray-100 text-gray-800 border-gray-300",
      粗大ごみ: "bg-purple-100 text-purple-800 border-purple-300",
      禁止: "bg-red-200 text-red-900 border-red-400",
    };

    // リサイクル関連はすべて緑系に
    if (category.includes("リサイクル")) {
      return "bg-green-100 text-green-800 border-green-300";
    }

    return colors[category] || "bg-blue-100 text-blue-800 border-blue-300";
  };

  const getCategoryIcon = (category: string) => {
    if (category === "禁止") {
      return "🚫";
    }
    if (category.includes("リサイクル")) {
      return "♻️";
    }
    if (category === "粗大ごみ") {
      return "📦";
    }
    return "🗑️";
  };

  return (
    <div className="space-y-6">
      {/* 検索バー */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="品目名を入力してください（例：ペットボトル、テレビ、新聞紙）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* カテゴリーフィルター */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Filter className="mr-2 text-gray-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">
            分別区分で絞り込み
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("すべて")}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === "すべて"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            すべて
          </button>
          {["燃えるごみ", "破砕ごみ", "埋立ごみ", "粗大ごみ"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            )
          )}
          <button
            onClick={() =>
              setSelectedCategory(
                selectedCategory?.includes("リサイクル")
                  ? "すべて"
                  : "リサイクル"
              )
            }
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory?.includes("リサイクル")
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            リサイクル
          </button>
          <button
            onClick={() => setSelectedCategory("禁止")}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === "禁止"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            市で収集不可
          </button>
        </div>
      </div>

      {/* 検索結果の件数 */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-bold text-2xl text-green-600">
            {filteredItems.length}
          </span>{" "}
          件の品目が見つかりました
        </p>
      </div>

      {/* 検索結果一覧 */}
      <div className="grid gap-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg">
              該当する品目が見つかりませんでした。
            </p>
            <p className="text-gray-500 text-sm mt-2">
              別のキーワードで検索してみてください。
            </p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Trash2 className="text-gray-400 flex-shrink-0" size={24} />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 break-words">
                    {item.name}
                  </h3>
                </div>
                <span
                  className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold border flex items-center gap-2 whitespace-nowrap self-start ${getCategoryColor(
                    item.category
                  )}`}
                >
                  <span>{getCategoryIcon(item.category)}</span>
                  <span className="hidden sm:inline">{item.category}</span>
                  <span className="sm:hidden">
                    {item.category.replace(/（リサイクル）/g, "")}
                  </span>
                </span>
              </div>
              {item.howTo && (
                <div className="mt-3 p-3 md:p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1">
                    💡 出し方のポイント
                  </p>
                  <p className="text-sm md:text-base text-gray-700 break-words">
                    {item.howTo}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
