export interface RFMRawItem {
  id: string;
  recency: number;
  frequency: number;
  monetary: number;
}

export interface RFMItem extends RFMRawItem {
  frequencyScore: number;
  monetaryScore: number;
}
