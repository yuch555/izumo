"use client";

import { useState, useMemo, useEffect } from "react";
import Map, { Marker, Popup, useMap } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { Recycle, FileText, Milk, Beef, MapPin } from "lucide-react";
import type { RecyclingStore } from "../../../lib/recycling";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mapbox access token - 環境変数から取得
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// 出雲市の中心座標
const IZUMO_CENTER = {
  latitude: 35.3667,
  longitude: 132.7667,
  zoom: 11,
};

interface RecyclingMapProps {
  stores: RecyclingStore[];
}

// 地図を日本語化するコンポーネント
function MapLanguageControl() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const language = new MapboxLanguage({ defaultLanguage: "ja" });
    map.addControl(language);

    return () => {
      if (map && map.hasControl(language)) {
        map.removeControl(language);
      }
    };
  }, [map]);

  return null;
}

export function RecyclingMap({ stores }: RecyclingMapProps) {
  const [selectedStore, setSelectedStore] = useState<RecyclingStore | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 地域一覧を取得
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(stores.map((store) => store.region))
    );
    return ["all", ...uniqueRegions];
  }, [stores]);

  // フィルタリングされた店舗
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const regionMatch =
        selectedRegion === "all" || store.region === selectedRegion;

      let categoryMatch = true;
      if (selectedCategory !== "all") {
        const items = store.recycling_items;
        if (selectedCategory === "paper") {
          categoryMatch = items.paper.length > 0;
        } else if (selectedCategory === "plastic") {
          categoryMatch = items.plastic.length > 0;
        } else if (selectedCategory === "cans_bottles") {
          categoryMatch = items.cans_bottles.length > 0;
        }
      }

      return regionMatch && categoryMatch;
    });
  }, [stores, selectedRegion, selectedCategory]);

  // すべての店舗に座標があるか確認
  const hasValidCoordinates = stores.length > 0;

  return (
    <div className="space-y-4">
      {/* フィルター */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            地域で絞り込み
          </label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="すべての地域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての地域</SelectItem>
              {regions.slice(1).map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            品目で絞り込み
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="すべての品目" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての品目</SelectItem>
              <SelectItem value="paper">紙類</SelectItem>
              <SelectItem value="plastic">プラスチック</SelectItem>
              <SelectItem value="cans_bottles">缶・びん</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 地図または注意メッセージ */}
      {!MAPBOX_TOKEN ? (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 font-medium mb-2">
            ⚠️ Mapbox APIキーが設定されていません
          </p>
          <p className="text-sm text-yellow-700">
            環境変数{" "}
            <code className="bg-yellow-100 px-2 py-1 rounded">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </code>{" "}
            を設定してください。
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            取得方法:{" "}
            <a
              href="https://account.mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-900"
            >
              Mapboxアカウント
            </a>
            でアクセストークンを作成
          </p>
        </div>
      ) : !hasValidCoordinates ? (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium mb-2 flex items-center gap-2">
            <MapPin size={20} />
            座標データがありません
          </p>
          <p className="text-sm text-blue-700">
            現在、店舗の位置情報が登録されていないため、リスト表示のみとなります。
          </p>
        </div>
      ) : (
        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              latitude: IZUMO_CENTER.latitude,
              longitude: IZUMO_CENTER.longitude,
              zoom: IZUMO_CENTER.zoom,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapLib={import("mapbox-gl")}
            locale={{
              "NavigationControl.ResetBearing": "方位をリセット",
              "NavigationControl.ZoomIn": "拡大",
              "NavigationControl.ZoomOut": "縮小",
            }}
          >
            <MapLanguageControl />
            {filteredStores.map((store, index) => (
              <Marker
                key={index}
                latitude={store.latitude}
                longitude={store.longitude}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedStore(store);
                }}
              >
                <div className="cursor-pointer hover:scale-110 transition-transform bg-green-500 rounded-full p-2">
                  <Recycle className="text-white" size={24} />
                </div>
              </Marker>
            ))}

            {selectedStore && (
              <Popup
                latitude={selectedStore.latitude}
                longitude={selectedStore.longitude}
                onClose={() => setSelectedStore(null)}
                closeButton={true}
                closeOnClick={false}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg mb-1">
                    {selectedStore.store_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {selectedStore.region} - {selectedStore.address_partial}
                  </p>
                  <div className="space-y-2">
                    {selectedStore.recycling_items.paper.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-green-700 flex items-center gap-1">
                          <FileText size={14} /> 紙類:
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {selectedStore.recycling_items.paper.join("、")}
                        </p>
                      </div>
                    )}
                    {selectedStore.recycling_items.plastic.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                          <Milk size={14} /> プラスチック:
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {selectedStore.recycling_items.plastic.join("、")}
                        </p>
                      </div>
                    )}
                    {selectedStore.recycling_items.cans_bottles.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-orange-700 flex items-center gap-1">
                          <Beef size={14} /> 缶・びん:
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {selectedStore.recycling_items.cans_bottles.join(
                            "、"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      )}

      {/* リスト表示 */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          店舗一覧（{filteredStores.length}件）
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => setSelectedStore(store)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                  {store.store_name}
                </h3>
                <Recycle className="text-green-600" size={28} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                  {store.region}
                </span>
                {store.address_partial}
              </p>

              <div className="space-y-2">
                {store.recycling_items.paper.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <FileText className="text-green-700" size={16} />
                    {store.recycling_items.paper.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {store.recycling_items.plastic.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <Milk className="text-blue-700" size={16} />
                    {store.recycling_items.plastic.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {store.recycling_items.cans_bottles.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <Beef className="text-orange-700" size={16} />
                    {store.recycling_items.cans_bottles.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
