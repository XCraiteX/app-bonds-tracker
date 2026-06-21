"use client";

import * as React from "react";
import { entities } from "_/go/models";
import { ChartDataType, getPortfolioNameById, groupBondsByPorfolio } from "@/features/bonds-utils";
import CustomChart from "@/shared/chart";

export const description = "A donut chart with text";

type BondWithPortfolioName = entities.Bond & { portfolioName: string };

export function CapitalPlatformChart({
  bonds,
  portfolios,
}: {
  bonds: entities.Bond[];
  portfolios: entities.Portfolio[];
}) {
  const newBonds = React.useMemo<BondWithPortfolioName[]>(
    () =>
      bonds.map((bond) => ({
        ...bond,
        portfolioName: getPortfolioNameById(portfolios, bond.Portfolio!),
      })),
    [bonds, portfolios],
  );

  const chartData = React.useMemo<ChartDataType[]>(
    () => groupBondsByPorfolio(newBonds, portfolios),
    [newBonds, portfolios],
  );

  const totalValue = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);

  return (
    <CustomChart
      chartTitle="Распределение по платформам"
      chartDescription="Распределение по платформам"
      chartData={chartData}
      centerText={totalValue}
      chartKeyName="key"
    />
  );
}
