"use client";
import { useEffect, useState } from "react";
import { entities } from "../../../wailsjs/go/models";
import CalendarGrid from "@/widgets/calendar/calendar.grid";
import { GetBonds } from "../../../wailsjs/go/bonds/BondsController";
import { IoCalendarNumberSharp } from "react-icons/io5";
import Heading from "@/shared/heading";
import { currency } from "@/config";

export default function CalendarPage() {
  const [bonds, setBonds] = useState<entities.Bond[]>([]); // ← Пустой массив, без тестовых данных

  // Считаем общую сумму выплат за год
  const totalYearlyPayout = bonds.reduce(
    (sum, bond) => sum + bond.Coupon * bond.Quantity * bond.Months.split(",").length,
    0,
  );

  useEffect(() => {
    GetBonds().then((b) => {
      console.log("GetBonds result:", b);
      setBonds(b);
    });
  }, []);

  return (
    <div className="py-5">
      <div className="mx-auto">
        {/* Заголовок и статистика */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
          <div>
            <Heading>Календарь выплат</Heading>
            <p className="text-secondary">Все выплаты по вашим облигациям</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Общая статистика года */}
            {totalYearlyPayout > 0 && (
              <div className="bg-background border border-border rounded-xl py-4 px-6 flex items-center gap-6">
                <div className="flex items-center justify-center rotate-20 rotate-x-30 -rotate-y-20">
                  <div className="absolute shadow-[0_0_16px_24px] glass:shadow-[0_0_16px_22px] shadow-blue-900 glass:shadow-blue-500/60 rounded-full"></div>
                  <IoCalendarNumberSharp className="text-white/70 text-5xl z-10" />
                  <IoCalendarNumberSharp className="text-blue-900 glass:text-blue-600/40 text-5xl z-5 absolute translate-y-1 translate-x-1" />
                </div>

                <div>
                  <div className="text-gray-400 text-sm">Выплаты за год</div>
                  <div className="text-accent font-bold text-xl">
                    +{totalYearlyPayout.toLocaleString("ru-RU")} {currency}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Сообщение если нет облигаций */}
        {bonds.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">📅</div>
            <div className="text-gray-400 text-lg mb-2">Календарь выплат пуст</div>
            <div className="text-gray-600 text-sm">
              Добавьте облигации на главной странице, чтобы увидеть график выплат
            </div>
          </div>
        ) : (
          <CalendarGrid bonds={bonds} />
        )}
      </div>
    </div>
  );
}
