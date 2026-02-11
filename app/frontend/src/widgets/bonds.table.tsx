import { entities } from "../../wailsjs/go/models";

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left p-4 text-gray-400 font-medium">Тикер</th>
            <th className="text-left p-4 text-gray-400 font-medium">Номинал</th>
            <th className="text-left p-4 text-gray-400 font-medium">Купон</th>
            <th className="text-left p-4 text-gray-400 font-medium">Месяцы выплат</th>
            <th className="text-left p-4 text-gray-400 font-medium">День</th>
            <th className="text-left p-4 text-gray-400 font-medium">Кол-во</th>
            <th className="text-left p-4 text-gray-400 font-medium">Год. доход</th>
            <th className="text-left p-4 text-gray-400 font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {bonds.map((bond) => (
            <tr key={bond.Id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="p-4">
                <span className="font-mono text-blue-400">{bond.Name}</span>
              </td>
              <td className="p-4">{bond.Nominal.toLocaleString("ru-RU")} BYN</td>
              <td className="p-4">{bond.Coupon.toLocaleString("ru-RU")} BYN</td>
              <td className="p-4">
                <div className="flex gap-1">
                  {bond.Months.split(",")
                    .map((m) => Number(m))
                    .map((month) => (
                      <span key={month} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                        {months[month]}
                      </span>
                    ))}
                </div>
              </td>
              <td className="p-4 text-center">{bond.Day}</td>
              <td className="p-4 text-center">{bond.Quantity}</td>
              <td className="p-4 text-green-400 font-semibold">
                +{getTotalPayoutPerYear(bond).toLocaleString("ru-RU")} BYN
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(bond)}
                    className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded border border-blue-900 hover:border-blue-700 text-sm"
                  >
                    ✏️ Изменить
                  </button>
                  <button
                    onClick={() => onDelete(bond.Id ? bond.Id : 0)}
                    className="text-red-400 hover:text-red-300 px-2 py-1 rounded border border-red-900 hover:border-red-700 text-sm"
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
