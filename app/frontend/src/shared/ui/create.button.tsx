import { FaPlus } from "react-icons/fa6";
import Button from "./button";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function CreateButton({ onClick, children }: Props) {
  return (
    <Button onClick={onClick}>
      <FaPlus className="group-hover:rotate-90 duration-300" />
      {children}
    </Button>
  );
}
