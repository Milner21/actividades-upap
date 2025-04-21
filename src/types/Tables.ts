export type DataRow = {
  id: string | number;
  [key: string]: string | number | boolean | null | Date;
};
