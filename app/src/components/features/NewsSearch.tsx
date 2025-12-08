"use client";

import { Search, Calendar as CalendarIcon, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
};

type NewsSearchProps = {
  newsItems: NewsItem[];
};

export function NewsSearch({ newsItems }: NewsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  // カテゴリ一覧を取得
  const categories = useMemo(() => {
    const cats = new Set(
      newsItems
        .map((item) => item.category)
        .filter((cat): cat is string => Boolean(cat))
    );
    return ["all", ...Array.from(cats)];
  }, [newsItems]);

  // フィルタリングされたニュース
  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      // 日付フィルター
      let matchesDate = true;
      if (dateRange.from || dateRange.to) {
        const itemDate = new Date(item.pubDate);
        if (dateRange.from && itemDate < dateRange.from) {
          matchesDate = false;
        }
        if (dateRange.to) {
          const toEndOfDay = new Date(dateRange.to);
          toEndOfDay.setHours(23, 59, 59, 999);
          if (itemDate > toEndOfDay) {
            matchesDate = false;
          }
        }
      }

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [newsItems, searchQuery, selectedCategory, dateRange]);

  return (
    <div>
      {/* 検索とフィルター */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="お知らせを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <ToggleGroup
            type="single"
            value={selectedCategory}
            onValueChange={(value) => value && setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <ToggleGroupItem
                key={category}
                value={category}
                aria-label={category}
              >
                {category === "all" ? "すべて" : category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon size={16} />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy/MM/dd", { locale: ja })} -{" "}
                      {format(dateRange.to, "yyyy/MM/dd", { locale: ja })}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy/MM/dd", { locale: ja })
                  )
                ) : (
                  "期間で絞り込み"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange(range || {})}
                locale={ja}
                numberOfMonths={2}
              />
              {(dateRange.from || dateRange.to) && (
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRange({})}
                    className="w-full"
                  >
                    <X size={14} className="mr-1" />
                    クリア
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredNews.length}件のお知らせ
        </p>
      </div>

      {/* ニュースリスト */}
      <div className="grid gap-2">
        {filteredNews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            該当するお知らせが見つかりませんでした
          </p>
        ) : (
          filteredNews.map((item, index) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-2 hover:shadow-md hover:scale-[1.01] transition-all group"
              style={{
                animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="flex items-center mb-2 gap-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.pubDate).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                {item.description}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
