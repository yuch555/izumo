import cycleAriaData from "~/public/data/cycle-aria.json";

export interface RecyclingStore {
  region: string;
  store_name: string;
  address_partial: string;
  latitude: number;
  longitude: number;
  recycling_items: {
    paper: string[];
    plastic: string[];
    cans_bottles: string[];
  };
}

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    region: string;
    store_name: string;
    address_partial: string;
    recycling_paper: string;
    recycling_plastic: string;
    recycling_cans_bottles: string;
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

// JSONデータを読み込む関数
export function getAllRecyclingStores(): RecyclingStore[] {
  const data = cycleAriaData as GeoJSONData;
  
  return data.features.map((feature) => ({
    region: feature.properties.region,
    store_name: feature.properties.store_name,
    address_partial: feature.properties.address_partial,
    longitude: feature.geometry.coordinates[0],
    latitude: feature.geometry.coordinates[1],
    recycling_items: {
      paper: feature.properties.recycling_paper
        ? feature.properties.recycling_paper.split(", ").filter(Boolean)
        : [],
      plastic: feature.properties.recycling_plastic
        ? feature.properties.recycling_plastic.split(", ").filter(Boolean)
        : [],
      cans_bottles: feature.properties.recycling_cans_bottles
        ? feature.properties.recycling_cans_bottles.split(", ").filter(Boolean)
        : [],
    },
  }));
}
