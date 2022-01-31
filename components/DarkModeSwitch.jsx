import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import React from "react";

function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div
        aria-label="Toggle Dark Mode"
        className="fixed right-8 top-8  center h-10 w-10 rounded-full bg-gray-400/20 hover:bg-gray-200/20  cursor-pointer hover:scale-125 transition-transform duration-150"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </div>
    </div>
  );
}

export default DarkModeSwitch;
