export type PlasticItemType = {
  id: number;
  size: string;
  image: string;
  dummy_integer: string;
  price_per_plastic: string;
};

export type DropOffLocationItemType = {
  agents: object[];
  closing_hour: string;
  contacts: Contacts;
  created_at: string;
  id: number;
  location: Location;
  location_name: string;
  opening_hour: string;
  state: string; // 'Close' | 'Open now'
  total_delivered_plastics: number;
  total_plastics: number;
  total_plastics_not_delivered: number;
  updated_at: string;
};

export type Contacts = {
  line_1: string;
  line_2: string;
};

export type Location = {
  address: Address;
  latitude: number;
  longitude: number;
};

export type Address = {
  'ISO3166-2-lvl4': string;
  city_district: string;
  country: string;
  country_code: string;
  state: string;
  town: string;
};
