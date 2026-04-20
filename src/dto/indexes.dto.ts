export type Index = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percent: string;
  logo: string;
  isPositive: boolean;
};

export class IndexesDto {
  //@ts-ignore
  indexes: Index[];
}
