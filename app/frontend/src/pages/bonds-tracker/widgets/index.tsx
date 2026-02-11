import { Skeleton } from "@/shared/skeleton";

type Props = {
  condition: number | string;
  title: string;
  value1: string;
  value2: string;
  color: string;
};

export default function FinanceInfoBLock({ ...props }: Props) {
  return (
    <div className="bg-background border border-border rounded-xl p-4">
      <div className="text-secondary text-sm">{props.title}</div>
      <div className={`text-2xl font-bold ${props.color}`}>
        {props.condition ? <>{props.value1}</> : <Skeleton className="h-7 w-26" />}
      </div>
      {props.condition ? <p className="text-gray-500">{props.value2}</p> : <Skeleton className="h-5 w-20" />}
    </div>
  );
}
