"use client";
import { currency } from "@/config";
import { getNearestPayout } from "@/features/payments";
import { entities } from "_/go/models";
import { useState } from "react";

type Variant = "payout" | "current" | "default";
type Props = {
  variant?: Variant;
  children?: React.ReactNode;
  day: number;
  bonds: entities.Bond[];
  monthIndex: number;
};

const styles: Record<Variant, string> = {
  current: "text-white border-accent border bg-radial from-accent/60 to-accent/20 font-semibold",
  payout:
    "bg-radial from-blue-600/60 to-blue-600/20 text-white font-medium border border-blue-500 shadow-lg shadow-blue-500/20",
  default: "text-gray-400 hover:bg-gray-800 hover:text-gray-300 glass:hover:bg-white/10",
};

export default function CalendarCell({ variant = "default", ...props }: Props) {
  const [side, setSide] = useState<"left" | "right">("right");

  const filteredBonds = props.bonds
    .filter((b) => b.Day == props.day)
    .filter((b) => b.Months.split(",").map(Number).includes(props.monthIndex));

  const updateSide = (e: React.MouseEvent) => {
    const x = e.clientX;
    const vw = window.innerWidth;
    setSide(x < vw / 1.4 ? "right" : "left");
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    updateSide(e);
  };

  return (
    <div
      className={`group relative aspect-square flex items-center justify-center rounded-lg text-sm transition-all ${styles[variant]}`}
      onMouseEnter={(e) => handleMouseEnter(e)}
    >
      <div
        className={`group-hover:opacity-100 pointer-events-none duration-200 opacity-0 
        z-10 absolute p-2 bg-[#0c0e28]/40 backdrop-blur-[6px] top-0 rounded-lg border 
        border-border min-h-[100%] w-[280px] glass:bg-white/10 ${side == "right" ? "left-full ml-1" : "right-full mr-1"}`}
      >
        {filteredBonds.length > 0 ? (
          filteredBonds.map((b) => (
            <div key={b.Id} className="flex justify-between w-full px-1 items-center">
              <div>
                <div className="text-white font-mono text-md font-semibold">{b.Name}</div>
                <div className="text-muted font-mono text-sm font-semibold">{b.Quantity} шт</div>
              </div>
              <div className="text-accent text-md font-semibold">
                {(b.Coupon * b.Quantity).toFixed(2)} {currency}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col w-full px-1">
            <span className="text-md font-semibold">Нет выплат</span>
            <span className="text-muted text-sm font-normal">
              Следущая выплата через {getNearestPayout(props.bonds, props.monthIndex, props.day) - props.day} дней
            </span>
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
}
