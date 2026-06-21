import { currency } from "@/config";
import { getDaysInMonth } from "@/features/calendar/monthes";
import { getNearestPayout } from "@/features/payments";
import { entities } from "_/go/models";
import { IoMdInformationCircle } from "react-icons/io";

export default function PaymentNotify({ bonds }: { bonds: entities.Bond[] }) {
  const payoutDay = getNearestPayout(bonds, new Date().getMonth(), new Date().getDate());
  const daysForPayout =
    getDaysInMonth(new Date().getMonth()) - getNearestPayout(bonds, new Date().getMonth(), new Date().getDate());
  const filteredBonds = bonds.filter((b) => b.Day == payoutDay);

  return (
    <div className="bg-radial to-background border border-border items-center shadow-sm rounded-xl p-4 flex mb-4 gap-2">
      <div className="mr-3 relative flex items-center justify-center">
        <div className="absolute shadow-[0_0_16px_12px] shadow-blue-900 rounded-full"></div>
        <IoMdInformationCircle size={26} className="z-5" />
      </div>
      {filteredBonds.length > 0 ? (
        <>
          <span>Следующая выплата поступит </span>
          <span className="text-blue-500 font-semibold">
            {daysForPayout == 0
              ? "сегодня"
              : daysForPayout == 1
                ? "завтра"
                : daysForPayout == 2
                  ? "послезавтра"
                  : "через " + daysForPayout + " дн"}
          </span>
          <span>по бумаге</span>
          <span className="text-blue-500 font-semibold">&quot;{filteredBonds[0].Name}&quot;</span>
          <span>в размере</span>
          <span className="text-accent font-semibold">
            {filteredBonds[0].Coupon * filteredBonds[0].Quantity} {currency}.
          </span>
        </>
      ) : (
        <span>Информация о выплатах в этом месяце отсутствует</span>
      )}
    </div>
  );
}
