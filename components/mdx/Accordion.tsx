"use client";

import styles from "@/styles/mdx/components/accordion.module.scss";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type ItemProps = {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
};

export function Accordion({ children }: { children: React.ReactNode }) {
    return <div className={styles.accordion}>{children}</div>;
}

export function AccordionItem({
    title,
    defaultOpen = false,
    children,
}: ItemProps) {
    const btnId = useId();
    const panelId = `${btnId}-panel`;
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(defaultOpen);

    useLayoutEffect(() => {
        const el = panelRef.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.height = open ? "auto" : "0";
            el.style.opacity = open ? "1" : "0";
            return;
        }

        if (open) {
            // ouverture
            const h = el.scrollHeight;
            gsap.fromTo(
                el,
                { height: 0, opacity: 0 },
                {
                    height: h,
                    opacity: 1,
                    duration: 0.35,
                    ease: "power2.out",
                    onComplete: () => {
                        el.style.height = "auto";
                    },
                }
            );
        } else {
            // fermeture
            const h = el.scrollHeight;
            gsap.fromTo(
                el,
                { height: h, opacity: 1 },
                {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                }
            );
        }
    }, [open]);

    return (
        <div className={styles.accordion__item}>
            <button
                type="button"
                id={btnId}
                className={styles.accordion__trigger}
                aria-controls={panelId}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <h2>{title}</h2>
                <span aria-hidden>{open ? "−" : "+"}</span>
            </button>
            <div
                id={panelId}
                ref={panelRef}
                className={styles.accordion__panel}
                role="region"
                aria-labelledby={btnId}
                style={{ height: open ? "auto" : 0, overflow: "hidden" }}
            >
                <div className={styles.accordion__content}>{children}</div>
            </div>
        </div>
    );
}
