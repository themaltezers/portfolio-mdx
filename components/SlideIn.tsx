"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function SlideIn({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname(); // rejoue l’anim à chaque changement de page

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
                return;
            gsap.fromTo(
                ref.current,
                { xPercent: 100, autoAlpha: 0 },
                { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }
            );
        }, ref);
        return () => ctx.revert();
    }, [pathname]);

    return (
        <div ref={ref} style={{ willChange: "transform, opacity" }}>
            {children}
        </div>
    );
}
