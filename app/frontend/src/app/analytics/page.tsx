"use client";
import { useEffect, useState } from "react";
import { GetBonds } from "_/go/controller/BondsController";
import { CapitalCompanyChart } from "@/widgets/charts/capital-company-chart";
import { entities } from "_/go/models";
import { CapitalPlatformChart } from "@/widgets/charts/capital-platform-chart";
import { GetPortfolios } from "_/go/controller/PortfoliosController";
import YearChart from "@/widgets/charts/year-chart";

export default function CalendarPage() {
  const [bonds, setBonds] = useState<entities.Bond[]>([]); // ← Пустой массив, без тестовых данных
  const [portfolios, setPortfolios] = useState<entities.Portfolio[]>([]);

  useEffect(() => {
    GetPortfolios().then((res) => setPortfolios(res));
    GetBonds().then((res) => setBonds(res));
  }, []);

  if (bonds.length === 0) return <div>Loading...</div>;

  return (
    <div className="py-5">
      <div className="mx-auto">
        {/* Заголовок и статистика */}
        <div className="grid grid-cols-2 gap-4">
          {/* ГЛАВНЫЙ ЧАРТ ВЫПЛАТ */}
          <CapitalPlatformChart bonds={bonds} portfolios={portfolios} />
          <CapitalCompanyChart bonds={bonds} />
        </div>
      </div>
    </div>
  );
}
