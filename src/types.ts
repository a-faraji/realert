import { FC, ReactNode } from 'react';

export type RealertId = number;

/**
 * Configurations that are valid for `RealertProvider`
 */
export type RealertConfig = {
  template?: FC<RealertTemplateProps>;
};

/**
 * Props that should be given to `useRealert` hook.
 */
export type RealertProps<Parent extends RealertTemplateProps = RealertTemplateProps> = Partial<
  Omit<Parent, 'open' | 'content' | 'onClose'> & {
    autoHide: number;
    onClose: (id: RealertId) => void;
  }
>;

/**
 * The base props for any template which is written for Realert.
 * These props can be extended by the template.
 */
export type RealertTemplateProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  okText?: string;
  content: ReactNode;
};
