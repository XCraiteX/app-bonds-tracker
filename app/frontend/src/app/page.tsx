"use client";
import FinanceInfoBLock from "@/widgets/info.block";
import { useEffect, useState } from "react";
import { entities } from "_/go/models";
import { DeleteBond, GetBonds, InsertBond, UpdateBond } from "_/go/bonds/BondsController";
import BondsTable from "@/widgets/bonds.table";
import BondModal from "@/widgets/bond.modal";

// ICONS
import { FaPlus } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { altCurrency, altCurrencyLink, currency } from "@/config";
import { useAlerts } from "@/features/alerts/AlertsContext";
import axios from "axios";

export default function Home() {
  const { addAlert } = useAlerts();

  const [bonds, setBonds] = useState<entities.Bond[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBond, setEditingBond] = useState<entities.Bond | null>(null);

  const [totalBalance, setTotalBalance] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [altCurrencyRate, setAltCurrencyRate] = useState(0);

  const handleAddBond = async (newBond: entities.Bond) => {
    const err = await InsertBond(newBond);

    if (err != null) return;

    addAlert("Облигация успешно создана!", "success");

    setBonds([...bonds, newBond]);
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const bonds = await GetBonds();
    setBonds(bonds);
  };

  const handleEditBond = async (updatedBond: entities.Bond) => {
    await UpdateBond(updatedBond);

    addAlert("Облигация успешно изменена!", "success");

    fetchData();

    setIsModalOpen(false);
    setEditingBond(null);
  };

  const handleDeleteBond = async (id: number) => {
    // Подтверждение удаления
    const isConfirmed = confirm("Вы действительно хотите удалить облигацию?");

    if (!isConfirmed) return;
    const ok = await DeleteBond(id);

    if (!ok) addAlert("Произошла ошибка при удалении облигации!", "error");
    addAlert("Облигация успешно удалена!", "success");

    fetchData();
  };

  const openEditModal = (bond: entities.Bond) => {
    setEditingBond(bond);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingBond(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBond(null);
  };

  // ALT CURRENCY RATE
  useEffect(() => {
    axios.get(altCurrencyLink).then((res) => {
      setAltCurrencyRate(res.data.Cur_OfficialRate);
    });
  }, []);

  useEffect(() => {
    if (bonds.length === 0) {
      setYearlyIncome(0);
      setTotalBalance(0);
    }
    setYearlyIncome(bonds.reduce((sum, bond) => sum + bond.Coupon * bond.Quantity * bond.Months.split(",").length, 0));
    setTotalBalance(bonds.reduce((sum, bond) => sum + bond.Nominal * bond.Quantity, 0));
  }, [bonds]);

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
        <div>
          {/* <Heading>Учёт облигаций</Heading> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FinanceInfoBLock
              title="Общий баланс"
              condition={true}
              value1={`${totalBalance.toLocaleString("ru-RU")} ${currency}`}
              value2={`${(totalBalance * (1 / altCurrencyRate)).toLocaleString("ru-RU")} ${altCurrency}`}
              color="text-white"
              image={MdAccountBalanceWallet}
            />

            <FinanceInfoBLock
              title="Годовой доход"
              condition={true}
              value1={`${yearlyIncome.toLocaleString("ru-RU")} ${currency}`}
              value2={`${(yearlyIncome / 12).toLocaleString("ru-RU")} ${currency} / мес`}
              color="text-green-400"
              image={IoCalendarNumberSharp}
            />

            <FinanceInfoBLock
              title="Облигаций"
              condition={true}
              value1={`${bonds
                .map((bond) => bond.Quantity)
                .reduce((a, b) => a + b, 0)
                .toLocaleString("ru-RU")} шт`}
              value2={`${bonds.length} выпусков`}
              color="text-blue-400"
              image={IoDocumentTextSharp}
            />
          </div>
        </div>

        {/* Таблица и кнопка добавления */}
        <div className="bg-radial to-background border border-border rounded-xl px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Облигации</h2>
            <button
              onClick={openAddModal}
              className="relative group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <FaPlus className="group-hover:rotate-90 duration-300" /> Добавить облигацию
            </button>
          </div>

          <BondsTable bonds={bonds} onDelete={handleDeleteBond} onEdit={openEditModal} />
        </div>
      </div>

      <BondModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddBond}
        onEdit={handleEditBond}
        editBond={editingBond}
      />
    </div>
  );
}
