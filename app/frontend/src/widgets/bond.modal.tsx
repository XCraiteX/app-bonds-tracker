import { useState, useEffect } from "react";
import { entities } from "../../wailsjs/go/models";
import { AnimatePresence, motion } from "motion/react";

interface BondModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bond: entities.Bond) => void;
  onEdit?: (bond: entities.Bond) => void; // Новая функция для редактирования
  editBond?: entities.Bond | null; // Облигация для редактирования
}

export default function BondModal({ isOpen, onClose, onAdd, onEdit, editBond }: BondModalProps) {
  const [formData, setFormData] = useState<entities.Bond>({
    Name: "",
    Nominal: 0,
    Coupon: 1,
    Day: 25,
    Quantity: 1,
    Months: "",
  });
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

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

  // Заполняем форму при редактировании
  useEffect(() => {
    if (editBond) {
      setFormData({
        Name: editBond.Name,
        Nominal: editBond.Nominal,
        Coupon: editBond.Coupon,
        Day: editBond.Day,
        Quantity: editBond.Quantity,
        Months: editBond.Months,
      });
      setSelectedMonths(editBond.Months.split(",").map(Number));
    } else {
      // Сброс формы для добавления
      setFormData({
        Name: "",
        Nominal: 0,
        Coupon: 1,
        Day: 25,
        Quantity: 1,
        Months: "",
      });
      setSelectedMonths([]);
    }
  }, [editBond, isOpen]);

  const toggleMonth = (monthIndex: number) => {
    setSelectedMonths((prev) =>
      prev.includes(monthIndex) ? prev.filter((m) => m !== monthIndex) : [...prev, monthIndex],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bondData = {
      ...formData,
      Months: selectedMonths.join(","),
    };

    if (editBond && onEdit) {
      // Редактирование существующей облигации
      onEdit({
        ...bondData,
        Id: editBond.Id,
      });
    } else {
      // Добавление новой облигации
      const newBond: entities.Bond = {
        ...bondData,
        Id: Number(Math.random().toString(36).substr(2, 9)),
        Months: selectedMonths.join(","),
      };
      onAdd(newBond);
    }

    onClose();
  };

  const isEditing = !!editBond;
  const title = isEditing ? "Редактировать облигацию" : "Добавить облигацию";
  const buttonText = isEditing ? "Сохранить" : "Добавить";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-[4px]"
        >
          <div className="bg-background border border-border rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Тикер</label>
                <input
                  type="text"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                  placeholder="Тикер"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Номинал</label>
                  <input
                    type="number"
                    value={formData.Nominal}
                    onChange={(e) => setFormData({ ...formData, Nominal: +e.target.value })}
                    className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Купон</label>
                  <input
                    type="number"
                    step={0.01}
                    value={formData.Coupon}
                    onChange={(e) => setFormData({ ...formData, Coupon: +e.target.value })}
                    className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">День выплаты</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={formData.Day}
                    onChange={(e) => setFormData({ ...formData, Day: +e.target.value })}
                    className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Количество</label>
                  <input
                    type="number"
                    value={formData.Quantity}
                    onChange={(e) => setFormData({ ...formData, Quantity: +e.target.value })}
                    className="w-full bg-black/20 rounded-lg px-3 py-2 text-white outline-none focus:ring-1 ring-blue-500/80"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Месяцы выплат</label>
                <div className="grid grid-cols-3 gap-2 max-h-42 overflow-y-hidden">
                  {months.map((month, index) => (
                    <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
                      <input
                        type="checkbox"
                        checked={selectedMonths.includes(index)}
                        onChange={() => toggleMonth(index)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">{month}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium border border-border"
                >
                  {buttonText}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-background hover:bg-gray-700/30 text-gray-300 py-2 px-4 rounded-lg font-medium border border-border"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
