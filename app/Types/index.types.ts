import { FieldValues, UseFormReturn } from 'react-hook-form';

export type FormMethods<T extends FieldValues> = UseFormReturn<T>;

export type VoidFunction = () => void;
