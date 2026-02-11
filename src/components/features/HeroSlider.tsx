"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/image/稲佐の浜.jpg",
    alt: "稲佐の浜",
    caption: "稲佐の浜",
  },
  {
    src: "/image/稲佐の浜　夏の夕暮れ.jpg",
    alt: "稲佐の浜 夏の夕暮れ",
    caption: "稲佐の浜 夏の夕暮れ",
  },
  {
    src: "/image/立久恵峡.jpg",
    alt: "立久恵峡",
    caption: "立久恵峡",
  },
  {
    src: "/image/キララビーチ.jpg",
    alt: "キララビーチ",
    caption: "キララビーチ",
  },
  {
    src: "/image/薗の長浜.jpg",
    alt: "薗の長浜",
    caption: "薗の長浜",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-8">
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 lg:h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            出雲市お役立ちWEBサイト
          </h1>
          <p className="text-sm text-white/80 mb-3">
            出雲市での生活をもっと便利に
          </p>
          <p className="text-xs text-white/60">
            {slides[currentIndex].caption}
          </p>
        </div>
        {/* インジケーター */}
        <div className="absolute bottom-6 right-6 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* クレジット */}
      <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-2">
        写真提供:{" "}
        <a
          href="https://www.izumo-kankou.gr.jp/photograph"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          出雲観光写真ギャラリー
        </a>
      </p>
    </section>
  );
}
