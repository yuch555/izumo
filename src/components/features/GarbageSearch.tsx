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
import { GarbageItem } from "~/lib/garbage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

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
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="品目名を入力してください（例：ペットボトル、テレビ、新聞紙）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* カテゴリーフィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter size={20} />
            分別区分で絞り込み
          </CardTitle>
          <CardDescription>表示するゴミの分別区分を選択してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant={selectedCategory === "すべて" ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory("すべて")}
              >
                すべて
              </Badge>
            </motion.div>
            {["燃えるごみ", "破砕ごみ", "埋立ごみ", "粗大ごみ"].map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant={selectedCategory === "リサイクル" ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory("リサイクル")}
              >
                リサイクル
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant={selectedCategory === "禁止" ? "destructive" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory("禁止")}
              >
                市で収集不可
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* 検索結果の件数 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          <span className="font-bold text-2xl text-primary">
            <CountUp end={filteredItems.length} duration={0.5} preserveValue />
          </span>{" "}
          件の品目が見つかりました
        </p>
      </motion.div>

      {/* 検索結果一覧 */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-lg font-medium mb-2">
                    該当する品目が見つかりませんでした。
                  </p>
                  <p className="text-sm text-muted-foreground">
                    別のキーワードで検索してみてください。
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                  layout: { duration: 0.3 }
                }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Trash2 className="text-muted-foreground shrink-0" size={24} />
                        <h3 className="text-lg md:text-xl font-bold">
                          {item.name}
                        </h3>
                      </div>
                      <Badge
                        variant={item.category === "禁止" ? "destructive" : item.category.includes("リサイクル") ? "default" : "secondary"}
                        className="gap-2 self-start"
                      >
                        <span>{getCategoryIcon(item.category)}</span>
                        <span className="hidden sm:inline">{item.category}</span>
                        <span className="sm:hidden">
                          {item.category.replace(/（リサイクル）/g, "")}
                        </span>
                      </Badge>
                    </div>
                    {item.howTo && (
                      <div className="mt-3 p-3 md:p-4 bg-muted rounded-lg border-l-4 border-primary">
                        <p className="text-xs md:text-sm font-semibold mb-1 flex items-center gap-2">
                          <Lightbulb size={16} className="text-yellow-600 dark:text-yellow-400" />
                          出し方のポイント
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {item.howTo}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
