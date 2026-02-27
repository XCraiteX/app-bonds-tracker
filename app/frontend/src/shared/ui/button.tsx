import { FaPlus } from "react-icons/fa6";

type Props = {
  color?: "blue" | "red";
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Button({ onClick, children, color = "blue" }: Props) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`relative group flex items-center gap-3 ${colors[color]} text-white px-4 py-2 rounded-lg font-medium`}
    >
      {children}
    </button>
  );
}
