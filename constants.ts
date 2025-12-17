import { PropertyType, FurnishingStatus, PossessionStatus } from './types';

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Gurgaon',
  'Noida'
];

export const PROPERTY_TYPES = [
  { label: 'Apartment / Flat', value: PropertyType.APARTMENT },
  { label: 'Independent House', value: PropertyType.INDEPENDENT_HOUSE },
  { label: 'Villa', value: PropertyType.VILLA },
  { label: 'Plot / Land', value: PropertyType.PLOT },
];

export const FURNISHING_OPTIONS = [
  { label: 'Unfurnished', value: FurnishingStatus.UNFURNISHED },
  { label: 'Semi-Furnished', value: FurnishingStatus.SEMI_FURNISHED },
  { label: 'Fully Furnished', value: FurnishingStatus.FULLY_FURNISHED },
];

export const POSSESSION_OPTIONS = [
  { label: 'Ready to Move', value: PossessionStatus.READY_TO_MOVE },
  { label: 'Under Construction', value: PossessionStatus.UNDER_CONSTRUCTION },
];

export const BHK_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, "6+"];
