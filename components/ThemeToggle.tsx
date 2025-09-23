// components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? (
                <IconContext.Provider value={{ className: "react-icons" }}>
                    <MdOutlineDarkMode width={24} height={24} />
                </IconContext.Provider>
            ) : (
                <IconContext.Provider value={{ className: "react-icons" }}>
                    <MdOutlineLightMode />
                </IconContext.Provider>
            )}
        </button>
    );
}
