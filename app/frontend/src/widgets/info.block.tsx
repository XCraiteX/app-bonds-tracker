import { Skeleton } from "@/shared/skeleton";
import { IconType } from "react-icons";
import { FaPiggyBank } from "react-icons/fa6";

type Props = {
  condition: number | string | boolean;
  title: string;
  value1: string;
  value2: string;
  color: string;
  image: IconType;
};

export default function FinanceInfoBLock({ ...props }: Props) {
  const Image = props.image || FaPiggyBank;

  return (
    <div className="bg-radial to-background border border-border shadow-sm rounded-xl p-4 flex justify-between">
      <div>
        <div className="text-secondary text-sm mb-0.5">{props.title}</div>
        <div className={`text-2xl font-bold ${props.color}`}>
          {props.condition ? <>{props.value1}</> : <Skeleton className="h-7 w-26" />}
        </div>
        {props.condition ? <p className="text-muted">{props.value2}</p> : <Skeleton className="h-5 w-20" />}
      </div>
      <div className="flex items-center px-2 justify-center rotate-20 rotate-x-30 -rotate-y-20">
        <div className="absolute shadow-[0_0_20px_32px] shadow-blue-900 glass:shadow-blue-500/60 rounded-full "></div>
        <Image className="text-white/70 text-7xl z-10" />
        <Image className="text-blue-900 glass:text-blue-600/40 text-7xl z-5 absolute translate-y-1 translate-x-1" />
      </div>
    </div>
  );
}
