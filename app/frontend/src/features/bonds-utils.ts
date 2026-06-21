import { getRandomHexColor } from "@/lib/utils";
import { entities } from "_/go/models";

export type ChartDataType = {
  key: string;
  value: number;
};

export function getPortfolioNameById(portfolios: entities.Portfolio[], portfolioId: number): string {
  return portfolios.find((p) => p.Id === portfolioId)?.Title ?? "";
}

export function groupBondsByCompany(bonds: entities.Bond[]): ChartDataType[] {
  const map = bonds.reduce<Record<string, number>>((acc, bond) => {
    const company = bond.Company ?? "Unknown";
    const value = (bond.Nominal ?? 0) * (bond.Quantity ?? 0);

    acc[company] = (acc[company] ?? 0) + value;
    return acc;
  }, {});

  return Object.entries(map).map(([key, value]) => ({
    key,
    value,
    fill: getRandomHexColor(),
  }));
}

export function groupBondsByPorfolio(bonds: entities.Bond[], portfolios: entities.Portfolio[]): ChartDataType[] {
  const map = bonds.reduce<Record<string, number>>((acc, bond) => {
    const porfolioId = bond.Portfolio ?? 0;
    const portfolioName = getPortfolioNameById(portfolios, porfolioId);
    const value = (bond.Nominal ?? 0) * (bond.Quantity ?? 0);

    acc[portfolioName] = (acc[portfolioName] ?? 0) + value;
    return acc;
  }, {});

  return Object.entries(map).map(([key, value]) => ({
    key,
    value,
    fill: getRandomHexColor(),
  }));
}
