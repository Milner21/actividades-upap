import { JSX } from 'react';

export type Row<T> = T & { id: string | number };

export type Column<T> = {
  key: keyof T ;
  label: string;
  render?: (value: T[keyof T], row: T) => JSX.Element | string;
};
