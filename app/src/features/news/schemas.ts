import { z } from "zod";

// ニュースアイテムのスキーマ
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  pubDate: z.string(), // 日付文字列として受け入れる（ISO 8601制約を緩和）
  category: z.string(),
});

// ニュースレスポンスのスキーマ
export const NewsResponseSchema = z.object({
  items: z.array(NewsItemSchema),
  lastUpdated: z.string().datetime(),
});

// 型定義をエクスポート
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type NewsResponse = z.infer<typeof NewsResponseSchema>;
