import { createContext } from 'react';
import { RealertId, RealertTemplateProps } from './types';

export type RealertContext = {
  addAlert: (props: RealertTemplateProps) => RealertId;
  editAlert: (id: RealertId, props: Partial<RealertTemplateProps>) => void;
  removeAlert: (id: RealertId) => void;
}

export const RealertContext = createContext<RealertContext | null>(null);
