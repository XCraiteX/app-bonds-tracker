import { motion } from "motion/react";
import { Alert } from "./AlertsContext";
import { icons } from "@/config";

const styles = {
  success: "bg-green-600/40 border-green-600/20 text-white",
  error: "bg-red-600/40 border-red-600/20 text-white",
};

export default function AlertObj({ ...data }: Alert) {
  const Image = icons[data.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`flex gap-2 items-center py-2 px-3 rounded-md shadow-md border z-200 ${styles[data.type]}`}
    >
      <Image />
      {data.message}
    </motion.div>
  );
}
