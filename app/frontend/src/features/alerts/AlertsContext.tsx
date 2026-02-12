"use client";
import { createContext, useContext } from "react";

export type AlertTypes = "success" | "error";

export type Alert = {
  id: number;
  message: string;
  type: AlertTypes;
};

export type AlertContextType = {
  alerts: Alert[];
  addAlert: (message: string, type: AlertTypes) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlerts must be used within a AlertProvider");
  }
  return ctx;
}

export default AlertContext;
