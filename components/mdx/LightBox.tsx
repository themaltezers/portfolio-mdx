"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/mdx/components/lightbox.module.scss";

type Props = { images: string[]; altPrefix?: string };

export default function Lightbox({ images, altPrefix = "img" }: Props) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);

    const openAt = (i: number) => {
        setIdx(i);
        setOpen(true);
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft")
                setIdx((i) => (i - 1 + images.length) % images.length);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, images.length]);

    return (
        <>
            {/* Liste simple cliquable */}
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`${altPrefix}-${i + 1}`}
                    loading="lazy"
                    className={styles.thumb}
                    onClick={() => openAt(i)}
                />
            ))}

            {/* Overlay fullscreen */}
            {open &&
                createPortal(
                    <div
                        className={styles.overlay}
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setOpen(false)}
                    >
                        <button
                            type="button"
                            className={`${styles.ctrl} ${styles.close}`}
                            aria-label="Fermer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            ×
                        </button>

                        <button
                            type="button"
                            className={`${styles.ctrl} ${styles.prev}`}
                            aria-label="Précédente"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIdx(
                                    (i) =>
                                        (i - 1 + images.length) % images.length
                                );
                            }}
                        >
                            ‹
                        </button>

                        <img
                            src={images[idx]}
                            alt={`${altPrefix}-fullscreen-${idx + 1}`}
                            className={styles.full}
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                        />

                        <button
                            type="button"
                            className={`${styles.ctrl} ${styles.next}`}
                            aria-label="Suivante"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIdx((i) => (i + 1) % images.length);
                            }}
                        >
                            ›
                        </button>

                        <div className={styles.count} aria-hidden>
                            {idx + 1} / {images.length}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
