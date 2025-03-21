export interface Link {
  ext: string;
  to: string;
  visitors: {
    region: string;
    date: Date;
  }
}
