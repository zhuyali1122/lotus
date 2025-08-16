export type Asset = {
  country: string;
  count: number;
};

export type Manager = {
  id: string;
  name: string;
  aum: string;
  historicalYield: string;
  assetCount: number;
  description: string;
  assets: Asset[];
}; 