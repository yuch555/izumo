"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Trash2,
  AlertCircle,
  BanIcon,
  Package,
  Lightbulb,
} from "lucide-react";
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
      if (selectedCategory === "リサイクル") {
        // リサイクルは曖昧検索（部分一致）
        items = items.filter((item) => item.category.includes("リサイクル"));
      } else {
        items = items.filter((item) => item.category === selectedCategory);
      }
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
      return <BanIcon size={16} className="inline" />;
    }
    if (category.includes("リサイクル")) {
      return "リサイクル";
    }
    if (category === "粗大ごみ") {
      return <Package size={16} className="inline" />;
    }
    return "ゴミ";
  };

  return (
    <div className="space-y-6">
      {/* 検索バー */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="品目名を入力してください（例：ペットボトル、テレビ、新聞紙）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-all text-base placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* カテゴリーフィルター */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg mr-3">
            <Filter className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            分別区分で絞り込み
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("すべて")}
            className={`px-5 py-2.5 rounded-full transition-all font-medium shadow-sm ${
              selectedCategory === "すべて"
                ? "bg-green-600 dark:bg-green-500 text-white shadow-green-200 dark:shadow-green-900/50 hover:bg-green-700 dark:hover:bg-green-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            すべて
          </button>
          {["燃えるごみ", "破砕ごみ", "埋立ごみ", "粗大ごみ"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full transition-all font-medium shadow-sm ${
                  selectedCategory === category
                    ? "bg-green-600 dark:bg-green-500 text-white shadow-green-200 dark:shadow-green-900/50 hover:bg-green-700 dark:hover:bg-green-600"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            )
          )}
          <button
            onClick={() => setSelectedCategory("リサイクル")}
            className={`px-5 py-2.5 rounded-full transition-all font-medium shadow-sm ${
              selectedCategory === "リサイクル"
                ? "bg-green-600 dark:bg-green-500 text-white shadow-green-200 dark:shadow-green-900/50 hover:bg-green-700 dark:hover:bg-green-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            リサイクル
          </button>
          <button
            onClick={() => setSelectedCategory("禁止")}
            className={`px-5 py-2.5 rounded-full transition-all font-medium shadow-sm ${
              selectedCategory === "禁止"
                ? "bg-red-600 dark:bg-red-500 text-white shadow-red-200 dark:shadow-red-900/50 hover:bg-red-700 dark:hover:bg-red-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            市で収集不可
          </button>
        </div>
      </div>

      {/* 検索結果の件数 */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-bold text-2xl text-green-600">
            {filteredItems.length}
          </span>{" "}
          件の品目が見つかりました
        </p>
      </div>

      {/* 検索結果一覧 */}
      <div className="grid gap-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center transition-colors">
            <AlertCircle
              className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
              size={48}
            />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              該当する品目が見つかりませんでした。
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              別のキーワードで検索してみてください。
            </p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-600"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Trash2
                    className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                    size={24}
                  />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 break-words">
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
                <div className="mt-3 p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                  <p className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                    <Lightbulb
                      size={16}
                      className="text-yellow-600 dark:text-yellow-400"
                    />
                    出し方のポイント
                  </p>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 break-words">
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
