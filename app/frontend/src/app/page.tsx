"use client";
import FinanceInfoBLock from "@/widgets/info.block";
import { useEffect, useState } from "react";
import { entities } from "_/go/models";
import BondsTable from "@/widgets/bonds/bonds.table";
import axios from "axios";

// ICONS
import { IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";

import { altCurrency, altCurrencyLink, currency } from "@/config";
import { useAlerts } from "@/features/alerts/AlertsContext";

import { DeleteBond, GetBonds, InsertBond, UpdateBond } from "_/go/controller/BondsController";
import { GetPortfolios, InsertPortfolio, UpdatePortfolio } from "_/go/controller/PortfoliosController";
import PortfolioModal from "@/widgets/portfolio.modal";
import CreateButton from "@/shared/ui/create.button";
import PaymentNotify from "@/widgets/payment.notify";
import BondModal from "@/widgets/bonds/bond.modal";
import Button from "@/shared/ui/button";

import { AnimatePresence, motion } from "motion/react";

export default function Home() {
  const { addAlert } = useAlerts();

  // SELECTING
  const [hiddenPortfolios, setHiddenPortfolios] = useState<number[]>([]);

  const [bonds, setBonds] = useState<entities.Bond[]>([]);
  const [portfolios, setPortfolios] = useState<entities.Portfolio[]>([]);
  const [portfolioId, setPortfolioId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const [editingBond, setEditingBond] = useState<entities.Bond | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<entities.Portfolio | null>(null);

  const [totalBalance, setTotalBalance] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [altCurrencyRate, setAltCurrencyRate] = useState(0);

  const handleAddBond = async (newBond: entities.Bond) => {
    const err = await InsertBond(newBond);

    if (err != null) return;

    addAlert("Облигация успешно создана!", "success");

    fetchData();
    setIsModalOpen(false);
  };

  const handleAddPortfolio = async (newPortfolio: string) => {
    const err = await InsertPortfolio(newPortfolio);
    if (err != null) return;
    fetchData();
    addAlert("Облигация успешно создана!", "success");
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    setBonds(await GetBonds());
    setPortfolios(await GetPortfolios());
  };

  const handleEditBond = async (updatedBond: entities.Bond) => {
    const res = await UpdateBond(updatedBond);

    if (!res) addAlert("Произошла ошибка при изменении облигации!", "error");

    addAlert("Облигация успешно изменена!", "success");
    fetchData();
    setIsModalOpen(false);
    setEditingBond(null);
  };

  const handleEditPortfolio = async (updatedPortfolio: entities.Portfolio) => {
    const res = await UpdatePortfolio(updatedPortfolio);
    if (!res) addAlert("Произошла ошибка при изменении портфолио!", "error");
    addAlert("Облигация успешно изменена!", "success");
    fetchData();
    setIsModal2Open(false);
    setEditingPortfolio(null);
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
    setPortfolioId(bond.Portfolio!);
    setIsModalOpen(true);
  };

  const openEditModal2 = (p: entities.Portfolio) => {
    setEditingPortfolio(p);
    setIsModal2Open(true);
  };

  const openAddModal = (pId: number) => {
    setPortfolioId(pId);
    setEditingBond(null);
    setIsModalOpen(true);
  };

  const openAddModal2 = (pId: number) => {
    setPortfolioId(pId);
    setEditingBond(null);
    setIsModal2Open(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBond(null);
  };

  const closeModal2 = () => {
    setIsModal2Open(false);
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
    fetchData();
  }, []);

  return (
    <div className="py-4">
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
              color="text-accent"
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

        <PaymentNotify bonds={bonds} />

        {/* Таблица и кнопка добавления */}
        {portfolios.map((p, i) => (
          <div key={p.Id} className="bg-radial to-background border border-border rounded-xl px-6 py-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">{p.Title}</h2>

              <div className="flex gap-2">
                <CreateButton onClick={() => openAddModal(p.Id ? p.Id : 0)}>Добавить</CreateButton>
                <Button onClick={() => openEditModal2({ Id: p.Id ? p.Id : 0, Title: p.Title })}>
                  <FaEdit />
                </Button>
                <Button color="red">
                  <FaTrash />
                </Button>

                <button
                  className="px-2 opacity-90"
                  onClick={() =>
                    hiddenPortfolios.includes(i)
                      ? setHiddenPortfolios((prev) => prev.filter((p) => p != i))
                      : setHiddenPortfolios((prev) => [...prev, i])
                  }
                >
                  <IoIosArrowDown size={22} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!hiddenPortfolios.includes(i) && (
                <motion.div
                  key={i + "21"}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <BondsTable
                    bonds={bonds.filter((r) => r.Portfolio == p.Id)}
                    onDelete={handleDeleteBond}
                    onEdit={openEditModal}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="flex justify-center items-center">
          <CreateButton onClick={() => openAddModal2(0)}>Добавить потрфель</CreateButton>
        </div>
      </div>

      <BondModal
        portfolioId={portfolioId}
        isOpen={isModalOpen}
        editBond={editingBond}
        onClose={closeModal}
        onAdd={handleAddBond}
        onEdit={handleEditBond}
      />

      <PortfolioModal
        portfolioId={portfolioId}
        editPortfolio={editingPortfolio}
        isOpen={isModal2Open}
        onAdd={handleAddPortfolio}
        onClose={closeModal2}
        onEdit={handleEditPortfolio}
      />
    </div>
  );
}
