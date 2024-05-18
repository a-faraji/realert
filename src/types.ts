import { FC, ReactNode } from 'react';

export type RealertId = number;

export type RealertConfig = {
  Template: FC<RealertTemplateProps>;
};

export type RealertProps<Parent extends RealertTemplateProps = RealertTemplateProps> = Partial<
  Omit<Parent, 'open' | 'content' | 'onClose'> & {
    autoHide: number;
    onClose: (id: RealertId) => void;
  }
>;

export type RealertTemplateProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  content: ReactNode;
};
