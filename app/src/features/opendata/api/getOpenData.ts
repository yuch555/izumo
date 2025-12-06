import type { OpenDataResponse } from '../types';

// ローカルJSONからオープンデータを取得
export async function getOpenData(): Promise<OpenDataResponse> {
  const response = await fetch('/data/opendata.json');
  if (!response.ok) {
    throw new Error('Failed to fetch open data');
  }
  return response.json();
}

// 避難所データを取得
export async function getShelters() {
  const data = await getOpenData();
  return data.shelters;
}

// AEDデータを取得
export async function getAEDs() {
  const data = await getOpenData();
  return data.aeds;
}

// 公共施設データを取得
export async function getPublicFacilities() {
  const data = await getOpenData();
  return data.publicFacilities;
}
