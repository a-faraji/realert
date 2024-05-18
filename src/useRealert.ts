import { ComponentProps, FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import { RealertContext } from './RealertContext';
import { RealertId, RealertProps, RealertTemplateProps } from './types';

export default function useRealert<Template extends FC<RealertTemplateProps>>(): {
  show: (message: ReactNode, props?: RealertProps<ComponentProps<Template>>) => RealertId;
  hide: (id: RealertId) => void;
};

export default function useRealert<Template extends FC<RealertTemplateProps>>() {
  const context = useContext(RealertContext);

  if (!context) {
    throw new Error('useRealert must be used within RealertProvider');
  }

  const hide = useCallback(
    (id: RealertId) => {
      context.editAlert(id, { open: false });
    },
    [context],
  );

  const show = useCallback(
    (message: ReactNode, props: RealertProps<ComponentProps<Template>> = {}) => {
      // create the alert
      const id = context.addAlert({
        open: false,
        content: message,
        ...props,
        onClose: () => {},
      });

      // set open and onClose (it needs id)
      context.editAlert(id, {
        open: true,
        onClose: () => {
          if (props?.onClose) {
            props.onClose(id);
          } else {
            hide(id);
          }
        },
      });

      if (props?.autoHide && props.autoHide > 0) {
        setTimeout(() => hide(id), props.autoHide);
      }

      return id;
    },
    [context, hide],
  );

  return useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
}
