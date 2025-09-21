// components/PageSlide.tsx
"use client";

import {
    createContext,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

type Ctx = {
    container: React.RefObject<HTMLDivElement | null>;
    navTo: (href: string) => void;
};

const PageSlideContext = createContext<Ctx | undefined>(undefined);

export function PageSlide({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const isNavigating = useRef(false);

    const IN_DUR = 0.6;
    const OUT_DUR = 0.6;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
                return;
            gsap.fromTo(
                ref.current,
                { xPercent: 100, autoAlpha: 0 },
                {
                    xPercent: 0,
                    autoAlpha: 1,
                    duration: IN_DUR,
                    ease: "power3.out",
                }
            );
        }, ref);
        return () => ctx.revert();
    }, [pathname]);

    const navTo = useCallback(
        (href: string) => {
            if (!ref.current || isNavigating.current) {
                router.push(href);
                return;
            }
            isNavigating.current = true;
            ref.current.style.pointerEvents = "none";
            gsap.to(ref.current, {
                xPercent: 100, // inverse de l’entrée
                autoAlpha: 0,
                duration: OUT_DUR,
                ease: "power3.in",
                onComplete: () => router.push(href),
            });
        },
        [router]
    );

    const value = useMemo<Ctx>(() => ({ container: ref, navTo }), [navTo]);

    return (
        <PageSlideContext.Provider value={value}>
            <div ref={ref} style={{ willChange: "transform, opacity" }}>
                {children}
            </div>
        </PageSlideContext.Provider>
    );
}

export function ExitLink({
    href,
    children,
    className,
    ariaLabel,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
}) {
    const ctx = useContext(PageSlideContext);
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.button === 1) return; // new tab
        e.preventDefault();
        if (!ctx) {
            window.location.href = href;
            return;
        }
        ctx.navTo(href);
    };
    return (
        <a
            href={href}
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
        >
            {children}
        </a>
    );
}
