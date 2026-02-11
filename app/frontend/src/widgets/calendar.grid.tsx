import { useState } from "react";
import { entities } from "../../wailsjs/go/models";

interface CalendarGridProps {
  bonds: entities.Bond[];
  year?: number;
}

export default function CalendarGrid({ bonds, year }: CalendarGridProps) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Получаем текущий месяц (0-11)
  const currentMonth = new Date().getMonth();

  const [currentDate] = useState(new Date());
  const currentDay = currentDate.getDate();

  // Правильное количество дней в каждом месяце
  const getDaysInMonth = (monthIndex: number) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return daysInMonth[monthIndex];
  };

  // Получаем данные для месяца
  const getMonthData = (monthIndex: number) => {
    const monthBonds = bonds.filter((bond) => bond.Months.split(",").map(Number).includes(monthIndex));

    const totalPayout = monthBonds.reduce((sum, bond) => sum + bond.Coupon * bond.Quantity, 0);

    const payoutDays = [...new Set(monthBonds.map((bond) => bond.Day))];

    return { bonds: monthBonds, totalPayout, payoutDays };
  };

  // Генерируем дни месяца с правильным количеством
  const generateDays = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(monthIndex);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map((month, monthIndex) => {
        const { bonds: monthBonds, totalPayout, payoutDays } = getMonthData(monthIndex);
        const days = generateDays(monthIndex);

        // Проверяем, является ли месяц текущим
        const isCurrentMonth = monthIndex === currentMonth;

        return (
          <div
            key={monthIndex}
            className={`
              bg-gray-900 border rounded-xl p-5 transition-all relative
              ${
                isCurrentMonth
                  ? "border-green-500 shadow-2xl shadow-green-500/20 ring-2 ring-green-500/30"
                  : "border-gray-800 hover:border-gray-700"
              }
            `}
          >
            {/* Индикатор текущего месяца */}
            {isCurrentMonth && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">Сейчас</div>
              </div>
            )}

            {/* Заголовок месяца и сумма выплат */}
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`
                text-lg font-semibold
                ${isCurrentMonth ? "text-green-400" : "text-white"}
              `}
              >
                {month}
              </h3>
              {totalPayout > 0 && (
                <span className="bg-green-900/50 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-800">
                  +{totalPayout.toLocaleString("ru-RU")} BYN
                </span>
              )}
            </div>

            {/* Сетка дней */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                <div key={day} className="text-center text-xs text-gray-500 py-1">
                  {day}
                </div>
              ))}

              {days.map((day) => {
                const isPayoutDay = payoutDays.includes(day);
                return (
                  <div
                    key={day}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                      ${
                        day == currentDay && isCurrentMonth
                          ? "bg-green-500 text-white border-green-600 font-semibold"
                          : isPayoutDay
                            ? "bg-blue-600 text-white font-medium border border-blue-500 shadow-lg shadow-blue-500/20"
                            : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                      }
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Список облигаций с выплатами в этом месяце */}
            {monthBonds.length > 0 && (
              <div className="border-t border-gray-800 pt-4">
                <h4 className="text-gray-400 text-sm font-medium mb-3">Выплаты в этом месяце:</h4>
                <div className="space-y-2">
                  {monthBonds.map((bond) => (
                    <div
                      key={bond.Id}
                      className="flex justify-between items-center p-2 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div>
                        <div className="text-white font-mono text-sm">{bond.Name}</div>
                        <div className="text-gray-400 text-xs">{bond.Day} число</div>
                      </div>
                      <div className="text-green-400 font-semibold">
                        +{(bond.Coupon * bond.Quantity).toLocaleString("ru-RU")} BYN
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {monthBonds.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
                Нет выплат в этом месяце
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
