"use client";

import { useEffect, useState } from "react";
import { Car, MapPin, Banknote, Tag } from "lucide-react";

interface ParkingLot {
  id: number;
  name: string;
  totalSpaces: number;
  availableSpaces: number | null;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  area: string;
  pricing: string;
  features: string[];
  updatedAt: string;
}

interface ParkingData {
  success: boolean;
  data: ParkingLot[];
  timestamp: string;
  areas: string[];
  count: number;
}

export function ParkingList() {
  const [parkingData, setParkingData] = useState<ParkingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>("全て");

  useEffect(() => {
    fetchParkingData();
  }, []);

  async function fetchParkingData() {
    try {
      setLoading(true);
      const response = await fetch("/api/parking/availability");
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
      const data = await response.json();
      setParkingData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-800 dark:text-red-200">{error}</p>
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
      {/* エリアフィルター */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          エリアで絞り込み
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedArea("全て")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedArea === "全て"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            全て ({parkingData.data.length})
          </button>
          {parkingData.areas.map((area) => {
            const count = parkingData.data.filter(
              (lot) => lot.area === area
            ).length;
            return (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedArea === area
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {area} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 更新時刻 */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        最終更新: {new Date(parkingData.timestamp).toLocaleString("ja-JP")}
        <button
          onClick={fetchParkingData}
          className="ml-4 text-blue-500 hover:text-blue-600 underline"
        >
          更新
        </button>
      </div>

      {/* 駐車場リスト */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((lot) => (
          <div
            key={lot.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {/* 駐車場名とエリア */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {lot.name}
              </h3>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                {lot.area}
              </span>
            </div>

            {/* 収容台数 */}
            {lot.totalSpaces > 0 && (
              <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
                <Car size={18} />
                <span>収容台数: {lot.totalSpaces}台</span>
              </div>
            )}

            {/* 住所 */}
            <div className="flex items-start gap-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
              <MapPin size={18} className="flex-shrink-0 mt-0.5" />
              <span className="break-words">{lot.address}</span>
            </div>

            {/* 料金情報 */}
            <div className="flex items-start gap-2 mb-3 text-gray-700 dark:text-gray-300 text-sm">
              <Banknote size={18} className="flex-shrink-0 mt-0.5" />
              <div className="break-words whitespace-pre-line">
                {lot.pricing}
              </div>
            </div>

            {/* 特徴タグ */}
            {lot.features.length > 0 && (
              <div className="flex items-start gap-2 mb-3">
                <Tag size={18} className="flex-shrink-0 mt-1 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {lot.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        feature === "無料"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : feature === "24時間営業"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            : feature === "観光地" || feature === "出雲大社近く"
                              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Googleマップリンク */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lot.location.lat},${lot.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              地図で見る
            </a>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {selectedArea}に該当する駐車場がありません
          </p>
        </div>
      )}
    </div>
  );
}
