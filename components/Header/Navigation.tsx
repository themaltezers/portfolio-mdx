"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "@/styles/components/navigation.module.scss";

export default function Navigation() {
    const pathname = usePathname();
    const t = useTranslations("Navigation");

    const links: { href: string; label: string }[] = t.raw("links");

    // Supprime le préfixe de langue (/fr ou /en)
    const stripLocale = (p: string | null) =>
        (p ?? "").replace(/^\/(fr|en)(?=\/|$)/, "") || "/";

    const isActive = (href: string) => {
        const p = stripLocale(pathname);

        // "Projets" → actif pour /, /projects et /projects/*
        if (href === "/") {
            return p === "/" || p.startsWith("/projects");
        }

        // autres liens: match sur le dernier segment
        const seg = p.split("/").pop() || "";
        return seg === href.replace("/", "");
    };

    return (
        <nav>
            <ul className={styles.selector}>
                {links.map(({ href, label }) => (
                    <li
                        key={href}
                        className={`${styles.selector__item} ${
                            isActive(href) ? styles.active : ""
                        }`}
                    >
                        <Link href={href}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
