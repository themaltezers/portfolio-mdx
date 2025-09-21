"use client";
import styles from "@/styles/components/header.module.scss";
import Navigation from "@/components/Header/Navigation";
import { useTranslations } from "next-intl";
import JobsList from "@/components/Header/JobList";

export default function Header() {
    const t = useTranslations("Header");
    const jobs: string[] = t.raw("jobs");
    return (
        <header className={styles.header}>
            <div className={styles.header__infos}>
                <h1 className={styles.header__title}>IBRAHIMA BARRY</h1>
                <JobsList jobs={jobs} className={styles.header__jobs} />
            </div>
            <Navigation />
        </header>
    );
}
