type Props = {
  isCurrentMonth: boolean;
  children?: React.ReactNode;
};

export default function MonthCard({ isCurrentMonth, children }: Props) {
  const styles = isCurrentMonth
    ? "border-accent shadow-md shadow-green-600/40 shadow-green-500/20"
    : "border-border hover:border-gray-800 glass:hover:border-white/20";

  return (
    <div className={`bg-radial to-background border rounded-xl p-5 transition-all relative ${styles}`}>
      {isCurrentMonth && (
        <div className="absolute -top-3">
          <div className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">Now</div>
        </div>
      )}
      {children}
    </div>
  );
}
