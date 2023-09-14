export type DecodePlasticsQrResponseType = {
  community_point_ratio: string;
  plastic_id: number;
  query_id: string;
  sizes: PlasticSize[];
  total_community_points: number;
  total_price: string;
  total_virtual_money: string;
  user_name: string;
  user_type: string;
  virtual_money_ratio: string;
};

export type PlasticSize = {
  image: string;
  price_per_plastic: string;
  quantity: number;
  size: string;
  total_price: string;
};
