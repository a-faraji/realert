'use client';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { RealertConfig, RealertId, RealertTemplateProps } from './types';
import { createPortal } from 'react-dom';
import { RealertContext } from './RealertContext';

const RealertProvider: FC<RealertProviderProps> = ({
  children,
  Template,
}) => {
  const [alerts, setAlerts] = useState<Map<RealertId, RealertTemplateProps>>(new Map());
  const lastId = useRef<RealertId>(0);

  const addAlert = useCallback((props: RealertTemplateProps) => {
    setAlerts(oldAlerts => {
      const newAlerts = new Map(oldAlerts);
      newAlerts.set(++lastId.current, props);
      return newAlerts;
    });
    return lastId.current;
  }, []);

  const editAlert = useCallback((id: RealertId, props: Partial<RealertTemplateProps>) => {
    setAlerts(oldAlerts => {
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
    setAlerts(oldAlerts => {
      const newAlerts = new Map(oldAlerts);
      if (newAlerts.has(id)) {
        newAlerts.delete(id);
      } else {
        console.log(`REMOVE: Alert with id '${id}' does not exists.`);
      }
      return newAlerts;
    });
  }, []);

  const contextValue: RealertContext = useMemo(() => ({
    addAlert,
    editAlert,
    removeAlert,
  }), [addAlert, editAlert, removeAlert]);

  return (
    <RealertContext.Provider value={contextValue}>
      {children}
      {createPortal(
        [...alerts.entries()].map((alert) => <Template key={alert[0]} {...alert[1]} />),
        document.body,
      )}
    </RealertContext.Provider>
  );
};

export type RealertProviderProps = RealertConfig & {
  children: React.ReactNode;
}

export default RealertProvider;
