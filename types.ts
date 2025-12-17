export enum PropertyType {
  APARTMENT = 'Apartment',
  INDEPENDENT_HOUSE = 'Independent House',
  VILLA = 'Villa',
  PLOT = 'Plot'
}

export enum FurnishingStatus {
  UNFURNISHED = 'Unfurnished',
  SEMI_FURNISHED = 'Semi-Furnished',
  FULLY_FURNISHED = 'Fully Furnished'
}

export enum PossessionStatus {
  READY_TO_MOVE = 'Ready to Move',
  UNDER_CONSTRUCTION = 'Under Construction'
}

export interface PropertyDetails {
  city: string;
  locality: string;
  pincode: string;
  propertyType: PropertyType;
  bhk: number; // 0 for plots
  area: number; // sq ft
  floor?: number;
  totalFloors?: number;
  ageOfProperty: number; // years
  furnishing: FurnishingStatus;
  possession: PossessionStatus;
}

export interface LeadDetails {
  name: string;
  email: string;
  phone: string;
}

export interface PriceTrendData {
  year: string;
  price: number;
}

export interface ValuationResult {
  minPrice: number;
  maxPrice: number;
  currency: string;
  avgPricePerSqFt: number;
  trends: PriceTrendData[];
  locationInsights: string[];
  marketSentiment: 'Bullish' | 'Bearish' | 'Neutral';
  confidenceScore: number; // 0-100
}