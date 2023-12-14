import { User } from './AuthTypes';

export type PlasticItemType = {
  id: number;
  size: string;
  image: string;
  dummy_integer: string;
  price_per_plastic: string;
};

export type DropOffLocationItemType = {
  agents: object[];
  closingHour: string;
  contacts: Contacts;
  created_at: string;
  id: number;
  dropoffLocation: {
    address: string | null;
    coordinates: number[];
    type: string;
  };
  name: string;
  location_name: string;
  days: [];
  isAvailable: boolean;
  openingHour: string;
  state: string; // 'Close' | 'Open now'
  total_delivered_plastics: number;
  total_plastics: number;
  total_plastics_not_delivered: number;
  updated_at: string;
};

export type Address = {
  'ISO3166-2-lvl4': string;
  city_district: string;
  country: string;
  country_code: string;
  state: string;
  town: string;
};

export interface AddPlasticResponseType {
  calculate_total_price: number;
  community_point_ratio: string;
  created_at: string;
  delivered_to: null;
  delivery_date: string;
  dropoff_location: DropoffLocation;
  get_total_community_points: number;
  get_total_virtual_money: null;
  id: number;
  _id: number;
  is_delivered: boolean;
  iv: string;
  qr_code: string;
  sizes: Size[];
  total_plastics: number;
  updated_at: string;
  user: User;
  user_type: string;
  virtual_money_ratio: string;
}

export interface DropoffLocation {
  agents: [];
  closing_hour: string;
  contacts: Contacts;
  created_at: string;
  id: number;
  location: Location;
  location_name: string;
  opening_hour: string;
  state: string;
  total_delivered_plastics: number;
  total_plastics: number;
  total_plastics_not_delivered: number;
  updated_at: string;
}

export interface Contacts {
  line_1: string;
  line_2: string;
}

export interface Location {
  address: [];
  latitude: number;
  longitude: number;
}

export interface Size {
  quantity: number;
  size: number;
  total_price: number;
}
