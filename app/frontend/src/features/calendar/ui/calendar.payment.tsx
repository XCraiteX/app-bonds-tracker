import { currency } from "@/config";
import { entities } from "_/go/models";
import { FaCheck, FaMoneyCheck } from "react-icons/fa6";

type Props = {
  bond: entities.Bond;
  isCurrentMonth: boolean;
  currentMonth: number;
  currentDay: number;
  monthIndex: number;
};

export default function CalendarPayment({ bond, isCurrentMonth, currentMonth, currentDay, monthIndex }: Props) {
  return (
    <div>
      <div
        className={`z-5 flex justify-between items-center w-full px-4 py-2 bg-background/40 rounded-lg shadow-xs border border-border`}
      >
        <div>
          <div className="text-white font-mono text-sm">
            {bond.Name.length > 18 ? `${bond.Name.slice(0, 18)}..` : bond.Name}
          </div>
          <div className="text-muted text-xs">{bond.Day} число</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-accent font-semibold">
            +{(bond.Coupon * bond.Quantity).toLocaleString("ru-RU")} {currency}
          </div>
          <div className="w-0.5 h-6 rounded-full bg-white/10 mr-1"></div>
          <div className="opacity-80 relative flex items-center justify-center w-4">
            {(isCurrentMonth && currentDay > bond.Day) || currentMonth > monthIndex ? (
              <>
                <div className="absolute shadow-[0_0_14px_10px] glass:shadow-[0_0_16px_8px] shadow-green-900 rounded-full"></div>
                <FaCheck className="z-5" />
              </>
            ) : (
              <>
                <div className="absolute shadow-[0_0_14px_10px] glass:shadow-[0_0_16px_8px] shadow-blue-900 rounded-full"></div>
                <FaMoneyCheck className="z-5" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
