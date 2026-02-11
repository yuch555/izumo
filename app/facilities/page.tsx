"use client";

import { useState, useMemo } from "react";
import { BackToHome } from "@/components/base/BackToHome";
import { Building2, MapPin, Phone, Search, X } from "lucide-react";
import facilitiesData from "~/public/data/izumo_public_facility.json";

type PublicFacility = {
  都道府県コード又は市区町村コード: number;
  NO: number | null;
  都道府県名: string;
  市区町村名: string;
  名称: string;
  名称_カナ: string;
  名称_通称: string | null;
  POIコード: string | null;
  住所: string;
  方書: string | null;
  緯度: number | null;
  経度: number | null;
  電話番号: string | null;
  内線番号: string | null;
  法人番号: string | null;
  団体名: string | null;
  利用可能曜日: string | null;
  開始時間: string | null;
  終了時間: string | null;
  利用可能時間特記事項: string | null;
  説明: string | null;
  バリアフリー情報: string | null;
  URL: string | null;
  備考: string | null;
};

const facilities = facilitiesData as PublicFacility[];

// 施設名からカテゴリを推測
function getCategoryFromName(name: string): string {
  if (name.includes("市役所") || name.includes("行政センター") || name.includes("市民センター")) return "行政機関";
  if (name.includes("小学校")) return "小学校";
  if (name.includes("中学校")) return "中学校";
  if (name.includes("高校") || name.includes("高等学校")) return "高等学校";
  if (name.includes("幼稚園")) return "幼稚園";
  if (name.includes("保育") || name.includes("こども園")) return "保育施設";
  if (name.includes("図書館")) return "図書館";
  if (name.includes("公民館") || name.includes("コミュニティ")) return "公民館";
  if (name.includes("体育館") || name.includes("スポーツ") || name.includes("運動")) return "スポーツ施設";
  if (name.includes("病院") || name.includes("診療所") || name.includes("クリニック")) return "医療機関";
  if (name.includes("消防")) return "消防";
  if (name.includes("警察") || name.includes("交番")) return "警察";
  if (name.includes("駐車場")) return "駐車場";
  return "その他";
}

// カテゴリごとの色
const categoryColors: Record<string, { bg: string; text: string }> = {
  "行政機関": { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-700 dark:text-blue-300" },
  "小学校": { bg: "bg-green-100 dark:bg-green-900/50", text: "text-green-700 dark:text-green-300" },
  "中学校": { bg: "bg-emerald-100 dark:bg-emerald-900/50", text: "text-emerald-700 dark:text-emerald-300" },
  "高等学校": { bg: "bg-teal-100 dark:bg-teal-900/50", text: "text-teal-700 dark:text-teal-300" },
  "幼稚園": { bg: "bg-pink-100 dark:bg-pink-900/50", text: "text-pink-700 dark:text-pink-300" },
  "保育施設": { bg: "bg-rose-100 dark:bg-rose-900/50", text: "text-rose-700 dark:text-rose-300" },
  "図書館": { bg: "bg-amber-100 dark:bg-amber-900/50", text: "text-amber-700 dark:text-amber-300" },
  "公民館": { bg: "bg-orange-100 dark:bg-orange-900/50", text: "text-orange-700 dark:text-orange-300" },
  "スポーツ施設": { bg: "bg-cyan-100 dark:bg-cyan-900/50", text: "text-cyan-700 dark:text-cyan-300" },
  "医療機関": { bg: "bg-red-100 dark:bg-red-900/50", text: "text-red-700 dark:text-red-300" },
  "消防": { bg: "bg-red-100 dark:bg-red-900/50", text: "text-red-700 dark:text-red-300" },
  "警察": { bg: "bg-indigo-100 dark:bg-indigo-900/50", text: "text-indigo-700 dark:text-indigo-300" },
  "駐車場": { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300" },
  "その他": { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-300" },
};

export default function FacilitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");

  // カテゴリ一覧を生成
  const categories = useMemo(() => {
    const cats = new Set<string>();
    facilities.forEach((f) => {
      cats.add(getCategoryFromName(f.名称));
    });
    return ["すべて", ...Array.from(cats).sort()];
  }, []);

  // フィルタリング
  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const category = getCategoryFromName(facility.名称);
      const matchesCategory = selectedCategory === "すべて" || category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        facility.名称?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.名称_カナ?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.住所?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackToHome />

        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              公共施設一覧
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            出雲市内の公共施設 {facilities.length}件
          </p>
        </div>

        {/* 検索・フィルター */}
        <div className="mb-6 space-y-4">
          {/* 検索バー */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="施設名・住所で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 検索結果数 */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredFacilities.length}件の施設
        </p>

        {/* 施設一覧 */}
        <div className="space-y-3">
          {filteredFacilities.map((facility, index) => {
            const category = getCategoryFromName(facility.名称);
            const colors = categoryColors[category] || categoryColors["その他"];

            return (
              <div
                key={`${facility.名称}-${index}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <div className={`${colors.bg} p-2 rounded-xl shrink-0`}>
                    <Building2 className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {category}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {facility.名称}
                    </h2>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{facility.住所}</span>
                      </p>
                      {facility.電話番号 && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Phone className="w-4 h-4 shrink-0" />
                          <a
                            href={`tel:${facility.電話番号}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {facility.電話番号}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              該当する施設が見つかりませんでした
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
