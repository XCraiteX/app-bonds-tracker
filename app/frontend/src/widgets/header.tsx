"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Quit, WindowMinimise } from "../../wailsjs/runtime/runtime";

// ICONS
import { IoClose } from "react-icons/io5";
import { LuMinimize2 } from "react-icons/lu";
import { SiGoogleanalytics } from "react-icons/si";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-linear-to-r from-[#020210] to-[#0f0f19] border-b border-gray-800/60 shadow-lg px-10 z-100 top-0 sticky">
      <div className="absolute inset-0 pointer-events-none flex overflow-hidden -z-10 flex-wrap gap-3">
        {Array(200)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-20 w-px rotate-20 bg-white/10"></div>
          ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Лого */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <SiGoogleanalytics />
            </div>
            <span className="text-white font-semibold text-lg">BondTracker</span>
          </Link>

          <div className="w-full drag h-full flex gap-4 overflow-hidden justify-center flex-col px-6 py-2">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-full h-0.5 bg-white/5"></div>
              ))}
          </div>

          {/* Навигационные ссылки */}
          <div className="flex space-x-3">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                pathname === "/"
                  ? "bg-blue-600/80 shadow-xs shadow-blue-700 text-white border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BsBriefcaseFill /> Портфель
            </Link>
            <Link
              href="/calendar"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                pathname === "/calendar"
                  ? "bg-blue-600/80 shadow-xs shadow-blue-700 text-white border-blue-500"
                  : "text-gray-400 hover:text-white "
              }`}
            >
              <IoCalendar /> Календарь
            </Link>
            <div className="flex items-center justify-center text-lg">
              <div className="w-0.25 h-[60%] bg-white/10 mr-3"></div>
              <button onClick={() => WindowMinimise()} className="h-full px-2">
                <LuMinimize2 />
              </button>
              <button onClick={() => Quit()} className="h-full px-2 text-2xl">
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
