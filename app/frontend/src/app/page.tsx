"use client";
import FinanceInfoBLock from "@/pages/bonds-tracker/widgets";
import Heading from "@/shared/heading";
import { useEffect, useState } from "react";
import { entities } from "../../wailsjs/go/models";
import { GetBonds, InsertBond } from "../../wailsjs/go/bonds/BondsController";
import BondsTable from "@/widgets/bonds.table";
import BondModal from "@/widgets/bond.modal";

export default function Home() {
  const [bonds, setBonds] = useState<entities.Bond[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBond, setEditingBond] = useState<entities.Bond | null>(null);

  const [totalBalance, setTotalBalance] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);

  const handleAddBond = async (newBond: entities.Bond) => {
    const err = await InsertBond(newBond);

    if (err != null) return;

    setBonds([...bonds, newBond]);
    setIsModalOpen(false);
  };

  const handleEditBond = async (updatedBond: entities.Bond) => {
    // const response = await api.edit_bond(updatedBond);

    // if (response.status != 200) return;

    setBonds(bonds.map((bond) => (bond.Id === updatedBond.Id ? updatedBond : bond)));
    setIsModalOpen(false);

    setEditingBond(null);
  };

  const handleDeleteBond = async (id: number) => {
    // Подтверждение удаления
    const isConfirmed = confirm("Вы действительно хотите удалить облигацию?");

    if (!isConfirmed) return;

    console.log(id);

    // const response = await api.delete_bond(id);

    // if (response.status != 200) return;

    // setBonds(bonds.filter((bond) => bond.id !== id));
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

  useEffect(() => {
    setYearlyIncome(bonds.reduce((sum, bond) => sum + bond.Coupon * bond.Quantity * bond.Months.length, 0));
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
        <div className="mb-8">
          <Heading>Учёт облигаций</Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <FinanceInfoBLock
              title="Общий баланс"
              condition={totalBalance}
              value1={`${totalBalance.toLocaleString("ru-RU")} BYN`}
              value2={`${(totalBalance * 0.337).toLocaleString("ru-RU")} $`}
              color="text-white"
            />

            <FinanceInfoBLock
              title="Годовой доход"
              condition={yearlyIncome}
              value1={`${yearlyIncome.toLocaleString("ru-RU")} BYN`}
              value2={`${(yearlyIncome / 12).toLocaleString("ru-RU")} $`}
              color="text-green-400"
            />

            <FinanceInfoBLock
              title="Облигаций"
              condition={bonds.length}
              value1={`${bonds
                .map((bond) => bond.Quantity)
                .reduce((a, b) => a + b, 0)
                .toLocaleString("ru-RU")} шт`}
              value2={`${bonds.length} выпусков`}
              color="text-blue-400"
            />
          </div>
        </div>

        {/* Таблица и кнопка добавления */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Мои облигации</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium border border-blue-500"
            >
              + Добавить облигацию
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
