"use client";

import * as React from "react";
import { Bar, BarChart, XAxis } from "recharts";

import { entities } from "_/go/models";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============

const MONTH_NAMES_RU_SHORT = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

// разбираем строку "1, 2, 3" -> [1, 2, 3]
function parseMonths(monthsStr: string): number[] {
  if (!monthsStr) return [];
  return monthsStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => !Number.isNaN(n) && n >= 1 && n <= 12);
}

// детерминированный цвет по названию компании
const companyColors: Record<string, string> = {};

function getColorByCompany(name: string): string {
  if (companyColors[name]) return companyColors[name];

  const hue = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;
  const color = `hsl(${hue} 70% 50%)`;
  companyColors[name] = color;
  return color;
}

// строим данные для чарта: [{ month: "Jan", "Газпром": 1000, ... }, ...]
type MonthRow = {
  month: string; // "Jan", "Feb" ...
  monthIndex: number; // 0-11
  [company: string]: number | string | number;
};

function buildChartData(bonds: entities.Bond[]): MonthRow[] {
  // инициализируем 12 месяцев
  const months: MonthRow[] = Array.from({ length: 12 }, (_, i) => ({
    month: MONTH_NAMES_RU_SHORT[i],
    monthIndex: i,
  }));

  bonds.forEach((bond) => {
    const company = bond.Company ?? "Unknown";
    const coupon = bond.Coupon ?? 0;
    const quantity = bond.Quantity ?? 0;
    const amount = coupon * quantity;

    const monthsList = parseMonths(bond.Months);

    monthsList.forEach((m) => {
      const idx = m - 1; // месяцы 1–12 -> 0–11
      const row = months[idx];

      const prev = (row[company] as number | undefined) ?? 0;
      row[company] = prev + amount;
    });
  });

  return months;
}

function buildChartConfig(companies: string[]): ChartConfig {
  return companies.reduce<ChartConfig>((acc, company) => {
    acc[company] = {
      label: company,
      color: getColorByCompany(company),
    };
    return acc;
  }, {});
}

// ============ КОМПОНЕНТ ============

export default function YearChart({ bonds }: { bonds: entities.Bond[] }) {
  const chartData = React.useMemo(() => buildChartData(bonds), [bonds]);

  const companies = React.useMemo(() => {
    const set = new Set<string>();
    chartData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "month" && key !== "monthIndex") {
          set.add(key);
        }
      });
    });
    return Array.from(set);
  }, [chartData]);

  const chartConfig = React.useMemo<ChartConfig>(() => buildChartConfig(companies), [companies]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Календарь выплат по месяцам</CardTitle>
        <CardDescription>Сумма выплат по эмитентам (Nominal × Quantity) за каждый месяц.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" tickLine={false} tickMargin={8} axisLine={false} />

            {companies.map((company) => (
              <Bar
                key={company}
                dataKey={company}
                stackId="payments"
                fill={getColorByCompany(company)}
                radius={[4, 4, 0, 0]}
              />
            ))}

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name) => {
                    if (typeof value !== "number") return value;
                    // name — это название компании
                    return `${value.toLocaleString("ru-RU", {
                      maximumFractionDigits: 2,
                    })} BYN`;
                  }}
                />
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
