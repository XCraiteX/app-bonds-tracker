// ICONS
import { FaChartPie } from "react-icons/fa";
import { TiChartBar } from "react-icons/ti";
import { FaChartArea } from "react-icons/fa";
import { MdStackedLineChart } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import { FaCoins } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";

const icons = [
  FaChartPie,
  TiChartBar,
  FaChartArea,
  MdStackedLineChart,
  HiDocumentText,
  FaMoneyCheck,
  FaMoneyBill,
  FaPiggyBank,
  RiBankFill,
  FaCoins,
  FaCalendarDays,
];

export default function Background() {
  return (
    <div className="fixed -z-10 inset-0 animate-pulse flex gap-4 pt-18 px-2 pb-2">
      {icons.map((ic, ind) => {
        const Image = ic;

        return <Image key={ind} className={`text-white/20 text-4xl rotate-20 z-5`} />;
      })}
    </div>
  );
}
