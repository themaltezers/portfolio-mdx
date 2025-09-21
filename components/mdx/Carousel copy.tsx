"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import styles from "@/styles/mdx/components/carousel.module.scss";

type CarouselProps = {
    images: string[];
    altPrefix?: string;
};

export default function Carousel({
    images,
    altPrefix = "carousel",
}: CarouselProps) {
    const [index, setIndex] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);

    const showImage = useCallback((i: number) => {
        if (!imgRef.current) return;
        const el = imgRef.current;

        // fade out -> change -> fade in
        gsap.to(el, {
            autoAlpha: 0,
            duration: 0.25,
            onComplete: () => {
                setIndex(i);
                gsap.fromTo(
                    el,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.25 }
                );
            },
        });
    }, []);

    const next = useCallback(() => {
        const i = (index + 1) % images.length;
        showImage(i);
    }, [index, images.length, showImage]);

    const prev = useCallback(() => {
        const i = (index - 1 + images.length) % images.length;
        showImage(i);
    }, [index, images.length, showImage]);

    // clavier
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev]);

    return (
        <div className={styles.slider}>
            <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onMouseDown={(e) => e.preventDefault()} // évite scroll auto
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prev();
                }}
                aria-label="Previous image"
            >
                ‹
            </button>

            <figure className={styles.slide}>
                <img
                    key={index} // force un remount pour bien relancer l’anim
                    ref={imgRef}
                    src={images[index]}
                    alt={`${altPrefix}-${index + 1}`}
                    loading="lazy"
                />
                <figcaption className={styles.caption}>
                    {index + 1} / {images.length}
                </figcaption>
            </figure>

            <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    next();
                }}
                aria-label="Next image"
            >
                ›
            </button>
        </div>
    );
}
