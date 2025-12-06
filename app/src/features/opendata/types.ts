// 島根県オープンデータの型定義

export type Shelter = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  type?: string;
};

export type AED = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  location: string;
  availability: string;
};

export type PublicFacility = {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  openingHours?: string;
};

export type OpenDataResponse = {
  shelters: Shelter[];
  aeds: AED[];
  publicFacilities: PublicFacility[];
  lastUpdated: string;
};
