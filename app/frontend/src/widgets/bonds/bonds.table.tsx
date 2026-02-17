import { entities } from "_/go/models";

// ICONS
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { currency } from "@/config";

interface BondsTableProps {
  bonds: entities.Bond[];
  onDelete: (id: number) => void;
  onEdit: (bond: entities.Bond) => void; // Новая функция для редактирования
}

export default function BondsTable({ bonds, onDelete, onEdit }: BondsTableProps) {
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

  const getTotalPayoutPerYear = (bond: entities.Bond) => {
    return bond.Coupon * bond.Quantity * bond.Months.split(",").length;
  };

  // const getMonthLabels = (payoutMonths: number[]) => {
  //   return payoutMonths.map((month) => months[month]).join(", ");
  // };

  if (bonds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">Нет добавленных облигаций</div>
        <div className="text-gray-600 text-sm">Нажмите &ldquo;Добавить облигацию&rdquo; чтобы начать</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <table className="w-full">
        <thead>
          <tr className="border-border">
            {["Тикер", "Номинал", "Купон", "Месяц выплаты", "День", "Кол-во", "Год. доход", ""].map((th, i) => (
              <th key={i} className="text-left p-4 text-gray-400 font-medium">
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bonds.map((bond) => (
            <tr key={bond.Id} className="border-t border-border/60 hover:bg-blue-950/25 glass:hover:bg-white/5">
              <td className="p-4">
                <span className="font-mono text-blue-400">{bond.Name}</span>
              </td>
              <td className="p-4">
                {bond.Nominal.toLocaleString("ru-RU")} {currency}
              </td>
              <td className="p-4">
                {bond.Coupon.toLocaleString("ru-RU")} {currency}
              </td>
              <td className="p-4">
                <div className="flex gap-1">
                  {bond.Months.split(",").length === 1 ? (
                    <span className="text-secondary"></span>
                  ) : bond.Months.split(",").length < 12 ? (
                    bond.Months.split(",")
                      .map((m) => Number(m))
                      .map((month) => (
                        <span
                          key={month}
                          className="px-2 py-1 bg-blue-900/20 glass:bg-white/10 rounded text-xs border border-border"
                        >
                          {months[month]}
                        </span>
                      ))
                  ) : (
                    <span className="text-secondary">Ежемесячно</span>
                  )}
                </div>
              </td>
              <td className="p-4 text-center">{bond.Day}</td>
              <td className="p-4 text-center">{bond.Quantity}</td>
              <td className="p-4 text-accent font-semibold">
                +{getTotalPayoutPerYear(bond).toLocaleString("ru-RU")} {currency}
              </td>
              <td className="p-4 text-lg">
                <div className="flex gap-4 items-center">
                  <MdEdit className="hover:scale-105 hover:text-blue-600" onClick={() => onEdit(bond)} />
                  <FaTrash
                    size={16}
                    className="hover:scale-105 hover:text-red-600"
                    onClick={() => onDelete(bond.Id ? bond.Id : 0)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
