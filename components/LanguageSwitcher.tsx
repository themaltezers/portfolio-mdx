"use client";

import styles from "@/styles/components/header.module.scss";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

const isLocale = (val: string): val is Locale =>
    (LOCALES as readonly string[]).includes(val);

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const seg1 = pathname?.split("/")[1] ?? "";
    const current: Locale = isLocale(seg1) ? seg1 : LOCALES[0];

    const switchLocale = (nextLocale: Locale) => {
        if (!pathname) return;
        const parts = pathname.split("/");
        const hasLocale = isLocale(parts[1] ?? "");
        if (hasLocale) parts[1] = nextLocale;
        else parts.splice(1, 0, nextLocale);
        router.push(parts.join("/") || "/");
    };

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.currentTarget.value;
        if (isLocale(val)) switchLocale(val);
    };

    return (
        <select
            value={current}
            onChange={onChange}
            aria-label="Language selector"
            className={styles.lang__switcher}
        >
            {LOCALES.map((l) => (
                <option key={l} value={l}>
                    {l.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
