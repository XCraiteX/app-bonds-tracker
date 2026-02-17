import { useState } from "react";
import { entities } from "../../../wailsjs/go/models";
import { currency } from "@/config";

// ICONS
import { FaMoneyCheck } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import CalendarCell from "@/features/calendar/ui/calendar.cell";
import { generateDays, months } from "@/features/calendar/monthes";
import WeekDays from "@/features/calendar/ui/calendar.week.days";
import MonthCard from "@/features/calendar/ui/month.card";
import MonthHeading from "@/features/calendar/ui/month.heading";
import CalendarPayment from "@/features/calendar/ui/calendar.payment";

interface CalendarGridProps {
  bonds: entities.Bond[];
  year?: number;
}

export default function CalendarGrid({ bonds }: CalendarGridProps) {
  const [currentMonth] = useState(new Date().getMonth());
  const [currentDay] = useState(new Date().getDate());

  // Получаем данные для месяца
  const getMonthData = (monthIndex: number) => {
    const monthBonds = bonds.filter((bond) => bond.Months.split(",").map(Number).includes(monthIndex));

    const totalPayout = monthBonds.reduce((sum, bond) => sum + bond.Coupon * bond.Quantity, 0);

    const payoutDays = [...new Set(monthBonds.map((bond) => bond.Day))];

    return { bonds: monthBonds, totalPayout, payoutDays };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((month, monthIndex) => {
        const { bonds: monthBonds, totalPayout, payoutDays } = getMonthData(monthIndex);
        const days = generateDays(monthIndex);

        // Проверяем, является ли месяц текущим
        const isCurrentMonth = monthIndex === currentMonth;

        return (
          <MonthCard key={monthIndex} isCurrentMonth={isCurrentMonth}>
            {/* Заголовок месяца и сумма выплат */}
            <MonthHeading isCurrentMonth={isCurrentMonth} totalPayout={totalPayout}>
              {month}
            </MonthHeading>

            {/* Сетка дней */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              <WeekDays />
              {days.map((day, i) => {
                const variant =
                  day === currentDay && isCurrentMonth ? "current" : payoutDays.includes(day) ? "payout" : "default";
                return (
                  <CalendarCell key={i} variant={variant} bonds={bonds} day={day} monthIndex={monthIndex}>
                    {day}
                  </CalendarCell>
                );
              })}
            </div>

            {/* Список облигаций с выплатами в этом месяце */}
            {monthBonds.length > 0 && (
              <div className="border-t border-border pt-4">
                <h4 className="text-gray-400 text-sm font-medium mb-3">Выплаты в этом месяце:</h4>
                <div className="space-y-2">
                  {monthBonds
                    .filter((b) => b.Coupon != 0)
                    .sort((bondA, bondB) => bondA.Day - bondB.Day)
                    .map((bond) => (
                      <CalendarPayment
                        key={bond.Id}
                        bond={bond}
                        isCurrentMonth={isCurrentMonth}
                        currentMonth={currentMonth}
                        currentDay={currentDay}
                        monthIndex={monthIndex}
                      />
                    ))}
                </div>
              </div>
            )}

            {monthBonds.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
                Нет выплат в этом месяце
              </div>
            )}
          </MonthCard>
        );
      })}
    </div>
  );
}
