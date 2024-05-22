import { ReactNode } from 'react';

export type RealertId = number;

/**
 * Props that should be given to `useRealert` hook.
 */
export type RealertProps<Parent extends RealertTemplateProps = RealertTemplateProps> = Partial<
  Omit<Parent, 'open' | 'content' | 'onClose'> & {
    /**
     * number of milliseconds for the alert to hide automatically
     */
    autoHide: number;
    /**
     * Function to be called when the user tries to close the alert.
     *
     * **Note:** if the function returns `true`, the alert will close.
     * @param id the id of the alert.
     */
    onClose: (id: RealertId) => void | boolean;
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
