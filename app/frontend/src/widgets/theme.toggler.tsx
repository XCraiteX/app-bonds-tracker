import { useTheme } from "next-themes";
import { BsMoonStarsFill } from "react-icons/bs"; // MOON
import { PiPintGlassFill } from "react-icons/pi"; // GLASS

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="rounded-full mr-6" onClick={() => setTheme(theme === "dark" ? "glass" : "dark")}>
      {theme === "dark" ? <BsMoonStarsFill size={20} /> : <PiPintGlassFill size={20} />}
    </div>
  );
}
