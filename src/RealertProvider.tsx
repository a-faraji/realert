import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { RealertId, RealertTemplateProps } from './types';
import { RealertContext } from './RealertContext';
import { DefaultTemplate } from './templates';

const RealertProvider: FC<RealertProviderProps> = ({ children, template = DefaultTemplate }) => {
  const [alerts, setAlerts] = useState<Map<RealertId, RealertTemplateProps>>(new Map());

  const lastId = useRef<RealertId>(0);

  const addAlert = useCallback((props: RealertTemplateProps) => {
    const id = ++lastId.current;
    setAlerts((oldAlerts) => {
      const newAlerts = new Map(oldAlerts);
      newAlerts.set(id, props);
      return newAlerts;
    });
    return id;
  }, []);

  const editAlert = useCallback((id: RealertId, props: Partial<RealertTemplateProps>) => {
    setAlerts((oldAlerts) => {
      const newAlerts = new Map(oldAlerts);
      const oldProps = newAlerts.get(id);
      if (oldProps) {
        newAlerts.set(id, Object.assign(oldProps, props));
      } else {
        console.log(`EDIT: Alert with id '${id}' does not exists.`);
      }
      return newAlerts;
    });
  }, []);

  const removeAlert = useCallback((id: RealertId) => {
    setAlerts((oldAlerts) => {
      const newAlerts = new Map(oldAlerts);
      if (newAlerts.has(id)) {
        newAlerts.delete(id);
      } else {
        console.log(`REMOVE: Alert with id '${id}' does not exists.`);
      }
      return newAlerts;
    });
  }, []);

  const contextValue: RealertContext = useMemo(
    () => ({
      addAlert,
      editAlert,
      removeAlert,
    }),
    [addAlert, editAlert, removeAlert],
  );

  const TemplateComponent = template;

  return (
    <RealertContext.Provider value={contextValue}>
      {children}
      {[...alerts.entries()].map((alert) => (
        <TemplateComponent key={alert[0]} {...alert[1]} />
      ))}
    </RealertContext.Provider>
  );
};

/**
 * Props for the `RealertProvider` component.
 */
export type RealertProviderProps = {
  /**
   * The template to be used for showing alerts.
   * If not provided, the default template will be used.
   *
   * @optional
   */
  template?: FC<RealertTemplateProps>;

  /**
   * The normal app content that should be passed as children.
   */
  children: React.ReactNode;
};

export default RealertProvider;
