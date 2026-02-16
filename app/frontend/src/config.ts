import { IconType } from "react-icons";

// ICONS
import { FaCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { AlertTypes } from "./features/alerts/AlertsContext";

export const currency = "BYN";
export const altCurrency = "$";
export const altCurrencyLink = "https://api.nbrb.by/exrates/rates/431?periodicity=0";
export const icons: Record<AlertTypes, IconType> = {
  success: FaCheck,
  error: MdOutlineError,
};
