import { currency } from "@/config";

type Props = {
  totalPayout: number;
  isCurrentMonth: boolean;
  children?: React.ReactNode;
};

export default function MonthHeading({ totalPayout, isCurrentMonth, children }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className={`text-lg font-semibold ${isCurrentMonth ? "text-accent" : "text-white"}`}>{children}</h3>
      {totalPayout > 0 && (
        <span className="bg-green-900/60 text-accent px-3 py-1 rounded-full text-sm font-medium border border-green-800">
          +{totalPayout.toLocaleString("ru-RU")} {currency}
        </span>
      )}
    </div>
  );
}
