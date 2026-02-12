"use client";
import { useAlerts } from "./AlertsContext";
import AlertObj from "./Alert";
import { AnimatePresence } from "motion/react";

export default function AlertsContainer() {
  const { alerts } = useAlerts();

  return (
    <div className="fixed bottom-3 right-3 flex flex-col gap-2 z-200">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => (
          <AlertObj key={alert.id} {...alert} />
        ))}
      </AnimatePresence>
    </div>
  );
}
