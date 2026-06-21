"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ChartDataType } from "@/features/bonds-utils";
import { currency } from "@/config";

type ChartType = {
  chartTitle: string;
  chartDescription: string;
  chartData: ChartDataType[];
  chartKeyName: string;
  centerText: string | number;
};

const chartConfig = {} satisfies ChartConfig;

export default function CustomChart({ ...data }: ChartType) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{data.chartTitle}</CardTitle>
        <CardDescription>{data.chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex min-h-40 w-full ">
        <div className="w-full flex">
          <ChartContainer config={chartConfig} className="aspect-square max-h-[320px]  justify-start">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="chart-tooltip"
                    formatter={(value, name) => [
                      <>
                        <span className="">{name}</span>
                        <span className="font-semibold text-accent ml-1">
                          {value} {currency}
                        </span>
                      </>,
                    ]}
                  />
                }
              />
              <Pie
                className="max-h-[320px] min-h-[280px]"
                data={data.chartData}
                dataKey="value"
                nameKey={data.chartKeyName}
                innerRadius={80}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {data.centerText.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted text-xl">
                            {currency}
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="py-2 w-full pr-4 h-68 custom-scroll">
            {data.chartData
              .sort((a, b) => b.value - a.value)
              .map((item, i) => (
                <div key={i} className="w-full flex justify-between">
                  <span>
                    {i + 1}. {item.key}
                  </span>
                  <span className="text-accent">
                    {item.value} {currency}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
