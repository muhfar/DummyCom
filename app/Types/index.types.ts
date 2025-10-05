import { FieldValues, UseFormReturn } from 'react-hook-form';
import { MD3Theme } from 'react-native-paper';

export type FormMethods<T extends FieldValues> = UseFormReturn<T>;

export type VoidFunction = () => void;
export type StringFunction = (value: string) => void;
export type NumberFunction = (value: number) => void;
export type BooleanFunction = (value: boolean) => void;
export type PromiseFunction = (value?: any) => Promise<void>;

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  reviews: Array<Review>;
  thumbnail: string;
  images: Array<string>;
}

export type UseTheme = MD3Theme;
