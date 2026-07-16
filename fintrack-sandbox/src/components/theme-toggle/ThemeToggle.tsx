import { Moon, Sun } from "lucide-react";
import styles from "./ThemeToggle.module.css";
import {useTheme} from "../../context/theme/use-theme.tsx";

type ThemeToggleProps = {
    className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDarkTheme = theme === "dark";

    return (
        <button
            type="button"
            className={`${styles.themeToggle} ${className ?? ""}`.trim()}
            onClick={toggleTheme}
            aria-label={isDarkTheme ? "Переключити на світлу тему" : "Переключити на темну тему"}
            title={isDarkTheme ? "Світла тема" : "Темна тема"}
        >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}