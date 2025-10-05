import type { PromiseFunction, VoidFunction } from '../../Types/index.types';

export type Props = {
  title?: string;
  description?: string;
  onReload: VoidFunction | PromiseFunction;
};
