"use client";
import { WindowMinimise, Quit } from "../../wailsjs/runtime";
import { IoClose } from "react-icons/io5";
import { MdMinimize } from "react-icons/md";

export default function DragHeader() {
  return (
    <div className="w-full text-center h-8 bg-[#0d121c] flex justify-end drag">
      <nav className="flex items-center">
        <button onClick={() => WindowMinimise()} className="h-full px-4 text-2xl">
          -
        </button>
        <button onClick={() => Quit()} className="h-full px-4">
          <IoClose />
        </button>
      </nav>
    </div>
  );
}
