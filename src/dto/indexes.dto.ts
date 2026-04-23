export type Index = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percent: string;
  logo: string;
  isPositive: boolean;
};

export type EPS = {
  symbol: string;
  name: string;
  actual: number;
  estimate: number;
  surprise: number;
  previous: number;
  isPositive: boolean;
  logo: string;
};

export type Macro = {
  name: string;
  actual: number;
  forecast: number;
  previous: number;
  logo: string;
  time: string;
  num: number;
};

export class IndexesDto {
  // @ts-ignore
  indexes: Index[];
  // @ts-ignore
  eps: EPS[];
  // @ts-ignore
  macro: Macro[];
  // @ts-ignore
  headline: string;
}
