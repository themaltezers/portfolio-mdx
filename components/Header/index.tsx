"use client";
import styles from "@/styles/components/header.module.scss";
import Navigation from "@/components/Header/Navigation";
import { useTranslations } from "next-intl";
import JobsList from "@/components/Header/JobList";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
    const t = useTranslations("Header");
    const jobs: string[] = t.raw("jobs");
    return (
        <header className={styles.header}>
            <div className={styles.header__infos}>
                <div className={styles.header__top}>
                    <h1 className={styles.header__title}>IBRAHIMA BARRY</h1>

                    <div className={styles.header__btns}>
                        <LanguageSwitcher />
                        <span className={styles.separator}></span>
                        <ThemeToggle />
                    </div>
                </div>
                <JobsList jobs={jobs} className={styles.header__jobs} />
            </div>
            <Navigation />
        </header>
    );
}
