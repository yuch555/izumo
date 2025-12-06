// いずも/新着お知らせの型定義

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
};

export type NewsResponse = {
  items: NewsItem[];
  lastUpdated: string;
};
