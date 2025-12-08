import garbageJson from "~/public/data/garbage.json";

export interface GarbageItem {
  name: string;
  category: string;
  howTo: string;
  kana?: string;
}

export const garbageCategories = [
  "燃えるごみ",
  "破砕ごみ",
  "埋立ごみ",
  "飲料用空き缶（リサイクル）",
  "空きびん（リサイクル）",
  "ペットボトル（リサイクル）",
  "使用済筒型乾電池など（リサイクル）",
  "使用済蛍光管（リサイクル）",
  "廃食用油（リサイクル）",
  "使用済割りばし（リサイクル）",
  "古紙（リサイクル）",
  "粗大ごみ",
  "禁止",
  "リサイクル協力店または市役所本庁窓口",
  "販売店または市役所本庁窓口",
  "出雲エネルギーセンターへ直接搬入",
  "燃えないごみ処理施設へ直接搬入",
] as const;

// JSONデータを変換
export const garbageData: GarbageItem[] = garbageJson.items.map((item) => {
  // 読み仮名を品目名から生成（簡易版）
  const kana = generateKana(item.item);
  
  return {
    name: item.item,
    category: item.category,
    howTo: item.notes || "",
    kana: kana,
  };
});

// 簡易的な読み仮名生成関数
function generateKana(name: string): string {
  // カタカナやアルファベットを含む場合はそのまま使用
  if (/[ァ-ヶ]/.test(name) || /[A-Z]/i.test(name)) {
    return name.toLowerCase();
  }
  
  // ひらがなの対応表（簡易版）
  const kanaMap: { [key: string]: string } = {
    "アイロン": "あいろん",
    "空き缶": "あきかん",
    "空きびん": "あきびん",
    "味付のり容器": "あじつけのりようき",
    "あぜなみ": "あぜなみ",
    // ... 必要に応じて追加
  };
  
  // 最初の単語でマッチング
  for (const [key, value] of Object.entries(kanaMap)) {
    if (name.startsWith(key)) {
      return value;
    }
  }
  
  // デフォルトは先頭の文字のひらがな
  return name.charAt(0).toLowerCase();
}
  

export function getAllGarbageItems(): GarbageItem[] {
  return garbageData;
}

export function searchGarbageItems(query: string): GarbageItem[] {
  const lowerQuery = query.toLowerCase();
  return garbageData.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      (item.kana && item.kana.includes(lowerQuery))
  );
}

export function filterByCategory(
  items: GarbageItem[],
  category: string
): GarbageItem[] {
  if (!category || category === "すべて") {
    return items;
  }
  return items.filter((item) => item.category === category);
}
