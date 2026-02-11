"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGoogleanalytics } from "react-icons/si";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Лого */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <SiGoogleanalytics />
            </div>
            <span className="text-white font-semibold text-lg">BondTracker</span>
          </Link>

          {/* Навигационные ссылки */}
          <div className="flex space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === "/"
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Портфель
            </Link>
            <Link
              href="/calendar"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === "/calendar"
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Календарь
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
