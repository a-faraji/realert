import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { RealertContext } from './RealertContext';
import { RealertId, RealertProps } from './types';

export default function useRealert() {
  const context = useContext(RealertContext);

  if (!context) {
    throw new Error('useRealert must be used within RealertProvider');
  }

  const show = useCallback((message: ReactNode, props?: RealertProps) => {
    const id = context.addAlert({
      open: true,
      content: message,
      onClose: (id: RealertId) => {
        context.removeAlert(id);
        props?.onClose(id);
      },
      title: props?.title,
    });

    if (props?.autoHide) {
      setTimeout(() => context.removeAlert(id), props.autoHide);
    }

    return id;
  }, []);

  return useMemo(
    () => ({
      show,
    }),
    [],
  );
}
