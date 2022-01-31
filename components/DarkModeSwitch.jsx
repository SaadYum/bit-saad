import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import React from "react";

function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="fixed right-8 top-8 p-3 h-12 w-12  cursor-pointer hover:scale-125 transition-transform duration-150"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default DarkModeSwitch;
