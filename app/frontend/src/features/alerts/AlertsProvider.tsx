"use client";
import { useState } from "react";
import AlertContext, { Alert, AlertContextType, AlertTypes } from "./AlertsContext";
import AlertsContainer from "./AlertsContainer";

type Props = {
  children: React.ReactNode;
};

export function AlertsProvider({ children }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [id, setId] = useState(1);

  const addAlert: AlertContextType["addAlert"] = (message: string, type: AlertTypes) => {
    setAlerts([...alerts, { message: message, type: type, id: id }]);

    setTimeout(() => setAlerts((a) => a.filter((x) => x.id !== id)), 5000);
    setId(id + 1);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
      <AlertsContainer />
    </AlertContext.Provider>
  );
}
