'use server';

import * as cheerio from 'cheerio';

// iPosLandのURLリスト
const PARKING_URLS = [
  'https://search.ipos-land.jp/p/parklist.aspx?scode=32203&choiki=%e9%a7%85%e5%8d%97%e7%94%ba',
  'https://search.ipos-land.jp/p/parklist.aspx?scode=32203&choiki=%e9%a7%85%e5%8c%97%e7%94%ba',
  'https://search.ipos-land.jp/p/parklist.aspx?scode=32203&choiki=%e4%bb%8a%e5%b8%82%e7%94%ba',
  'https://search.ipos-land.jp/p/parklist.aspx?scode=32203&choiki=%e5%a4%a7%e7%a4%be%e7%94%ba%e6%9d%b5%e7%af%89%e5%8d%97',
  'https://search.ipos-land.jp/p/parklist.aspx?scode=32203&choiki=%e5%a4%a7%e7%a4%be%e7%94%ba%e4%bf%ae%e7%90%86%e5%85%8d'
];

// エリア名のマッピング
const AREA_MAP: Record<string, string> = {
  '%e9%a7%85%e5%8d%97%e7%94%ba': '駅南町',
  '%e9%a7%85%e5%8c%97%e7%94%ba': '駅北町',
  '%e4%bb%8a%e5%b8%82%e7%94%ba': '今市町',
  '%e5%a4%a7%e7%a4%be%e7%94%ba%e6%9d%b5%e7%af%89%e5%8d%97': '大社町杵築南',
  '%e5%a4%a7%e7%a4%be%e7%94%ba%e4%bf%ae%e7%90%86%e5%85%8d': '大社町修理免'
};

export interface ParkingLot {
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

export interface ParkingData {
  success: boolean;
  data: ParkingLot[];
  timestamp: string;
  areas: string[];
  count: number;
}

async function scrapeParkingData(url: string, areaName: string): Promise<ParkingLot[]> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const parkingLots: ParkingLot[] = [];

    const rows = $('tr').filter(function() {
      const text = $(this).text();
      return text.includes('駐車場') || text.includes('パーク') || text.includes('台');
    });

    const rowsArray = rows.toArray();
    for (let index = 0; index < rowsArray.length; index++) {
      const element = rowsArray[index];
      const $row = $(element);
      const cells = $row.find('td');

      if (cells.length === 0) continue;

      const allText = $row.text();

      let name = '';
      const nameLink = $row.find('a').first();
      if (nameLink.length > 0) {
        name = nameLink.text().trim();
      }

      let address = '';
      cells.each((_i, cell) => {
        const text = $(cell).text().trim();
        if (text.includes('島根県') || text.includes('出雲市')) {
          address = text;
        }
      });

      let totalSpaces = 0;
      const capacityMatch1 = allText.match(/(\d+)\s*台/);
      if (capacityMatch1) {
        totalSpaces = parseInt(capacityMatch1[1]);
      }
      const capacityMatch2 = allText.match(/収容台数[：:]\s*(\d+)/);
      if (capacityMatch2) {
        totalSpaces = parseInt(capacityMatch2[1]);
      }
      if (totalSpaces === 0) {
        cells.each((_i, cell) => {
          const text = $(cell).text().trim();
          const numMatch = text.match(/^(\d+)$/);
          if (numMatch && parseInt(numMatch[1]) > 0 && parseInt(numMatch[1]) < 1000) {
            totalSpaces = parseInt(numMatch[1]);
          }
        });
      }

      let pricing = '';
      cells.each((_i, cell) => {
        const text = $(cell).text().trim();
        if (text.includes('¥') || text.includes('円') || text.includes('無料')) {
          pricing = text;
        }
      });

      if (name && (address || totalSpaces > 0 || pricing)) {
        const location = await estimateLocation(address, areaName);
        const features = extractFeatures(pricing, name);

        parkingLots.push({
          id: Date.now() + index,
          name,
          totalSpaces,
          availableSpaces: null,
          location,
          address: address || `${areaName}内`,
          area: areaName,
          pricing: pricing || '料金情報なし',
          features,
          updatedAt: new Date().toISOString()
        });
      }
    }

    if (parkingLots.length === 0) {
      const links = $('a').toArray();
      for (let index = 0; index < links.length; index++) {
        const element = links[index];
        const text = $(element).text().trim();
        if (text.includes('駐車場') || text.includes('パーク') || text.includes('プラザ')) {
          const parent = $(element).closest('tr, div');
          const fullText = parent.text();

          const capacityMatch = fullText.match(/(\d+)\s*台/);
          const totalSpaces = capacityMatch ? parseInt(capacityMatch[1]) : 0;

          if (totalSpaces > 0 || text.length > 0) {
            const location = await estimateLocation('', areaName);

            parkingLots.push({
              id: Date.now() + index,
              name: text,
              totalSpaces,
              availableSpaces: null,
              location,
              address: `${areaName}内`,
              area: areaName,
              pricing: '料金情報なし',
              features: extractFeatures('', text),
              updatedAt: new Date().toISOString()
            });
          }
        }
      }
    }

    return parkingLots;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!MAPBOX_TOKEN || !address) {
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_TOKEN}&country=JP&proximity=132.7553,35.3673&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
  }

  return null;
}

async function estimateLocation(address: string, area: string): Promise<{ lat: number; lng: number }> {
  if (address && address.includes('島根県')) {
    const coords = await geocodeAddress(address);
    if (coords) {
      return coords;
    }
  }

  const baseCoordinates: Record<string, { lat: number; lng: number }> = {
    '駅南町': { lat: 35.3591, lng: 132.7684 },
    '駅北町': { lat: 35.3605, lng: 132.7690 },
    '今市町': { lat: 35.3673, lng: 132.7553 },
    '大社町杵築南': { lat: 35.4017, lng: 132.6859 },
    '大社町修理免': { lat: 35.4025, lng: 132.6870 }
  };

  const base = baseCoordinates[area] || { lat: 35.3673, lng: 132.7553 };

  if (address) {
    const numberMatch = address.match(/(\d+)-(\d+)/);
    if (numberMatch) {
      const offset1 = (parseInt(numberMatch[1]) % 100) * 0.00001;
      const offset2 = (parseInt(numberMatch[2]) % 100) * 0.00001;
      return {
        lat: base.lat + offset1,
        lng: base.lng + offset2
      };
    }
  }

  return base;
}

function extractFeatures(pricing: string, name: string): string[] {
  const features: string[] = [];

  if (pricing.includes('無料') || pricing.includes('0円')) {
    features.push('無料');
  } else {
    features.push('有料');
  }

  if (pricing.includes('24時間')) {
    features.push('24時間営業');
  }

  if (pricing.includes('最大')) {
    features.push('最大料金あり');
  }

  if (name.includes('大社') || name.includes('出雲大社')) {
    features.push('観光地', '出雲大社近く');
  }

  if (name.includes('ホテル')) {
    features.push('ホテル利用者優先');
  }

  return features;
}

export async function getParkingData(): Promise<ParkingData> {
  try {
    const allParkingData: ParkingLot[] = [];

    for (const url of PARKING_URLS) {
      const areaKey = url.split('choiki=')[1];
      const areaName = AREA_MAP[areaKey] || '不明';

      const data = await scrapeParkingData(url, areaName);
      allParkingData.push(...data);
    }

    allParkingData.forEach((lot, index) => {
      lot.id = index + 1;
    });

    return {
      success: true,
      data: allParkingData,
      timestamp: new Date().toISOString(),
      areas: Object.values(AREA_MAP),
      count: allParkingData.length
    };
  } catch (error) {
    console.error('Error fetching parking data:', error);
    throw new Error('Failed to fetch parking data');
  }
}
