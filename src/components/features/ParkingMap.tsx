"use client";

import { useEffect, useState, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Car, Banknote } from "lucide-react";

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

interface ParkingMapProps {
  parkingLots: ParkingLot[];
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export function ParkingMap({ parkingLots }: ParkingMapProps) {
  const [selectedParking, setSelectedParking] = useState<ParkingLot | null>(
    null,
  );
  const [viewState, setViewState] = useState({
    longitude: 132.7553,
    latitude: 35.3673,
    zoom: 12,
  });

  const mapRef = useRef<any>(null);

  // 全ての駐車場が表示されるように地図の範囲を調整
  useEffect(() => {
    if (parkingLots.length > 0 && mapRef.current) {
      const bounds = parkingLots.reduce(
        (acc, lot) => {
          return {
            minLng: Math.min(acc.minLng, lot.location.lng),
            maxLng: Math.max(acc.maxLng, lot.location.lng),
            minLat: Math.min(acc.minLat, lot.location.lat),
            maxLat: Math.max(acc.maxLat, lot.location.lat),
          };
        },
        {
          minLng: parkingLots[0].location.lng,
          maxLng: parkingLots[0].location.lng,
          minLat: parkingLots[0].location.lat,
          maxLat: parkingLots[0].location.lat,
        },
      );

      mapRef.current.fitBounds(
        [
          [bounds.minLng, bounds.minLat],
          [bounds.maxLng, bounds.maxLat],
        ],
        {
          padding: 50,
          duration: 1000,
        },
      );
    }
  }, [parkingLots]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <p className="text-yellow-800 dark:text-yellow-200">
          Mapboxトークンが設定されていません。環境変数 NEXT_PUBLIC_MAPBOX_TOKEN
          を設定してください。
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* 駐車場マーカー */}
        {parkingLots.map((lot) => (
          <Marker
            key={lot.id}
            longitude={lot.location.lng}
            latitude={lot.location.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedParking(lot);
            }}
          >
            <div
              className="cursor-pointer transform transition-transform hover:scale-110"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              {lot.features.includes("無料") ? (
                <MapPin
                  size={32}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ) : (
                <MapPin
                  size={32}
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              )}
            </div>
          </Marker>
        ))}

        {/* 選択された駐車場のポップアップ */}
        {selectedParking && (
          <Popup
            longitude={selectedParking.location.lng}
            latitude={selectedParking.location.lat}
            anchor="top"
            onClose={() => setSelectedParking(null)}
            closeOnClick={false}
            className="parking-popup"
          >
            <div className="p-3 min-w-[250px]">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {selectedParking.name}
              </h3>

              <div className="space-y-2 text-sm">
                {/* エリア */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {selectedParking.area}
                  </span>
                </div>

                {/* 収容台数 */}
                {selectedParking.totalSpaces > 0 && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Car size={16} />
                    <span>{selectedParking.totalSpaces}台</span>
                  </div>
                )}

                {/* 住所 */}
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="text-xs">{selectedParking.address}</span>
                </div>

                {/* 料金 */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote size={16} className="text-gray-500" />
                    <span className="font-semibold text-gray-700 text-xs">
                      料金
                    </span>
                  </div>
                  <div className="ml-5 space-y-1">
                    {selectedParking.pricing
                      .split(/\n|｜/)
                      .slice(0, 3)
                      .map((line, index) => {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) return null;

                        const isMaxPrice =
                          trimmedLine.includes("最大") ||
                          trimmedLine.includes("上限");

                        return (
                          <div
                            key={index}
                            className={`text-xs p-1.5 rounded ${
                              isMaxPrice
                                ? "bg-green-50 text-green-700 font-medium"
                                : "bg-gray-50 text-gray-700"
                            }`}
                          >
                            {trimmedLine.length > 40
                              ? `${trimmedLine.substring(0, 40)}...`
                              : trimmedLine}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* 特徴タグ */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedParking.features
                    .slice(0, 3)
                    .map((feature, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          feature === "無料"
                            ? "bg-green-100 text-green-700"
                            : feature === "24時間営業"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                </div>

                {/* Googleマップリンク */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedParking.location.lat},${selectedParking.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Googleマップで開く
                </a>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* 凡例 */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-10">
        <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-100">
          凡例
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <MapPin size={20} fill="#10b981" stroke="#ffffff" strokeWidth={2} />
            <span className="text-gray-700 dark:text-gray-300">無料駐車場</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} fill="#3b82f6" stroke="#ffffff" strokeWidth={2} />
            <span className="text-gray-700 dark:text-gray-300">有料駐車場</span>
          </div>
        </div>
      </div>
    </div>
  );
}
