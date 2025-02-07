import React from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme} aria-label="Toggle theme" className="flex items-center gap-2">
            {theme === "light" ? <><Moon /> </> : <><Sun /> </>}
        </button>
    );
}
