import { IconType } from "react-icons";

// ICONS
import { FaCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { AlertTypes } from "./features/alerts/AlertsContext";

export const currency = "BYN";
export const icons: Record<AlertTypes, IconType> = {
  success: FaCheck,
  error: MdOutlineError,
};
