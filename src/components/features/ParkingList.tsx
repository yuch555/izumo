"use client";

import { useEffect, useState } from "react";
import { Car, MapPin, Map as MapIcon, List, Clock, Wallet, CheckCircle2, RefreshCw } from "lucide-react";
import { ParkingMap } from "./ParkingMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { getParkingData, type ParkingData } from "~/app/actions/parking";

export function ParkingList() {
  const [parkingData, setParkingData] = useState<ParkingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>("全て");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    fetchParkingData();
  }, []);

  async function fetchParkingData() {
    try {
      setLoading(true);
      const data = await getParkingData();
      setParkingData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('エラーが発生しました'));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Tab skeleton */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-60" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>

        {/* Area filter skeleton */}
        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-6 w-[140px] mb-2" />
            <Skeleton className="h-4 w-[280px]" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-[100px]" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Parking cards skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col h-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-[100px]" />
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                {/* 収容台数 */}
                <Skeleton className="h-[52px] w-full" />

                {/* 住所 */}
                <Skeleton className="h-[52px] w-full" />

                <Separator />

                {/* 料金情報 */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20 mb-3" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                </div>

                {/* 特徴タグ */}
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-20" />
                  ))}
                </div>

                {/* スペーサー */}
                <div className="flex-1" />

                <Separator />

                {/* ボタン */}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-800 dark:text-red-200">
          {error.message}
        </p>
        <button
          onClick={fetchParkingData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          再試行
        </button>
      </div>
    );
  }

  if (!parkingData || parkingData.data.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">
          駐車場データがありません
        </p>
      </div>
    );
  }

  const filteredData =
    selectedArea === "全て"
      ? parkingData.data
      : parkingData.data.filter((lot) => lot.area === selectedArea);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "map")}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <List size={16} />
              リスト表示
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <MapIcon size={16} />
              地図表示
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>最終更新: {new Date(parkingData.timestamp).toLocaleString("ja-JP")}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchParkingData}
              className="gap-2"
            >
              <RefreshCw size={14} />
              更新
            </Button>
          </div>
        </div>

        {/* エリアフィルター */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>エリアで絞り込み</CardTitle>
            <CardDescription>表示する駐車場のエリアを選択してください</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedArea === "全て" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setSelectedArea("全て")}
                >
                  全て ({parkingData.data.length})
                </Badge>
              </motion.div>
              {parkingData.areas.map((area) => {
                const count = parkingData.data.filter((lot) => lot.area === area).length;
                return (
                  <motion.div
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={selectedArea === area ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm"
                      onClick={() => setSelectedArea(area)}
                    >
                      {area} ({count})
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* マップ表示 */}
        <TabsContent value="map" className="mt-0">
          <ParkingMap parkingLots={filteredData} />
        </TabsContent>

        {/* 駐車場リスト */}
        <TabsContent value="list" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredData.map((lot, index) => (
                <motion.div
                  key={lot.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-2">
                <span>{lot.name}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="gap-1.5">
                  <MapPin size={12} />
                  {lot.area}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
              {/* 収容台数 */}
              {lot.totalSpaces > 0 && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <div className="bg-primary p-2 rounded-md">
                    <Car size={16} className="text-primary-foreground" />
                  </div>
                  <span className="font-medium text-sm">収容台数: {lot.totalSpaces}台</span>
                </div>
              )}

              {/* 住所 */}
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <div className="bg-muted-foreground/20 p-2 rounded-md shrink-0">
                  <MapPin size={14} />
                </div>
                <span className="text-sm text-muted-foreground">{lot.address}</span>
              </div>

              <Separator />

              {/* 料金情報 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-500 p-2 rounded-md">
                    <Wallet size={14} className="text-white" />
                  </div>
                  <span className="font-semibold text-sm">料金</span>
                </div>
                <div className="space-y-2">
                  {lot.pricing.split(/\n|｜/).map((line, index) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return null;

                    const isMaxPrice = trimmedLine.includes('最大') || trimmedLine.includes('上限');

                    return (
                      <div
                        key={index}
                        className={`text-xs p-2 rounded-md ${
                          isMaxPrice
                            ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 font-medium border border-green-200 dark:border-green-800'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {trimmedLine}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 特徴タグ */}
              {lot.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {lot.features.map((feature, index) => {
                    let icon = null;
                    let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

                    if (feature === "無料") {
                      icon = <CheckCircle2 size={12} />;
                      variant = "default";
                    } else if (feature === "24時間営業") {
                      icon = <Clock size={12} />;
                      variant = "secondary";
                    } else if (feature === "観光地" || feature === "出雲大社近く") {
                      icon = <MapPin size={12} />;
                      variant = "outline";
                    }

                    return (
                      <Badge
                        key={index}
                        variant={variant}
                        className="gap-1.5"
                      >
                        {icon}
                        {feature}
                      </Badge>
                    );
                  })}
                </div>
              )}

              {/* スペーサー: ボタンを下部に固定するため */}
              <div className="flex-1" />

              <Separator />

              {/* Googleマップリンク */}
              <Button
                asChild
                className="w-full gap-2 mt-auto"
                variant="default"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lot.location.lat},${lot.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={16} />
                  地図で見る
                </a>
              </Button>
            </CardContent>
          </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    {selectedArea}に該当する駐車場がありません
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
