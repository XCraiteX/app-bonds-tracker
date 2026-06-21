"use client";

import * as React from "react";
import { entities } from "_/go/models";
import { groupBondsByCompany } from "@/features/bonds-utils";
import CustomChart from "@/shared/chart";

export const description = "A donut chart with text";

export function CapitalCompanyChart({ bonds }: { bonds: entities.Bond[] }) {
  const chartData = React.useMemo(() => groupBondsByCompany(bonds), [bonds]);
  const totalValue = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);

  return (
    <CustomChart
      chartTitle="Диверсификация эмитентов"
      chartDescription="Капитал на эмитента"
      chartData={chartData}
      centerText={totalValue}
      chartKeyName="key"
    />
  );
}
