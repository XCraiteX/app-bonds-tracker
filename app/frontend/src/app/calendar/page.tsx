"use client";
import { useEffect, useState } from "react";
import { entities } from "../../../wailsjs/go/models";
import CalendarGrid from "@/widgets/calendar.grid";
import { GetBonds } from "../../../wailsjs/go/bonds/BondsController";

export default function CalendarPage() {
  const [bonds, setBonds] = useState<entities.Bond[]>([]); // ← Пустой массив, без тестовых данных

  // Считаем общую сумму выплат за год
  const totalYearlyPayout = bonds.reduce((sum, bond) => sum + bond.Coupon * bond.Quantity * bond.Months.length, 0);

  useEffect(() => {
    GetBonds().then((b) => {
      console.log("GetBonds result:", b);
      setBonds(b);
    });
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и статистика */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Календарь выплат
            </h1>
            <p className="text-gray-400">Все выплаты по вашим облигациям</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Общая статистика года */}
            {totalYearlyPayout > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
                <div className="text-gray-400 text-sm">Выплаты за год</div>
                <div className="text-green-400 font-bold text-xl">+{totalYearlyPayout.toLocaleString("ru-RU")} BYN</div>
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
