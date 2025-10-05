import { ReactNode } from 'react';
import { TextInputProps } from 'react-native';

export interface Props extends TextInputProps {
  name: string;
  label: string;
  left?: ReactNode;
  right?: ReactNode;
}
