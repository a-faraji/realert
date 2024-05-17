import {FC, ReactNode} from 'react';

export type RealertId = number;

export type RealertConfig = {
  Template: FC<RealertTemplateProps>;
}

export type RealertProps = Omit<RealertTemplateProps, 'open' | 'content'> & {
  autoHide?: number;
};

export type RealertTemplateProps = {
  open: boolean;
  onClose: (id: RealertId) => void;
  title?: string;
  content: ReactNode;
};
