// components/Markdown.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import styles from "@/styles/components/markdown.module.scss";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Props locales pour code et img
type CodeElProps = ComponentPropsWithoutRef<"code"> & {
    inline?: boolean;
    children?: ReactNode;
};
type ImgElProps = ComponentPropsWithoutRef<"img"> & {
    src?: string;
    alt?: string;
};

const components = {
    h1: (p: ComponentPropsWithoutRef<"h1">) => (
        <h1 className={styles.h1} {...p} />
    ),
    h2: (p: ComponentPropsWithoutRef<"h2">) => (
        <h2 className={styles.h2} {...p} />
    ),
    h3: (p: ComponentPropsWithoutRef<"h3">) => (
        <h3 className={styles.h3} {...p} />
    ),
    p: (p: ComponentPropsWithoutRef<"p">) => <p className={styles.p} {...p} />,
    ul: (p: ComponentPropsWithoutRef<"ul">) => (
        <ul className={styles.ul} {...p} />
    ),
    li: (p: ComponentPropsWithoutRef<"li">) => (
        <li className={styles.li} {...p} />
    ),
    a: (p: ComponentPropsWithoutRef<"a">) => (
        <a
            {...p}
            className={styles.a}
            target="_blank"
            rel="noopener noreferrer"
        />
    ),

    img: ({ src, alt }: ImgElProps) => {
        if (!src) return null;
        return (
            <span className={styles.figure}>
                <Image
                    src={src}
                    alt={alt ?? ""}
                    width={1600}
                    height={900}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                />
                {alt ? (
                    <figcaption className={styles.figcaption}>{alt}</figcaption>
                ) : null}
            </span>
        );
    },

    code: ({ inline, className, children, ...props }: CodeElProps) => {
        if (inline) {
            return (
                <code className={styles.codeInline} {...props}>
                    {children}
                </code>
            );
        }
        return (
            <pre className={styles.pre}>
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        );
    },
};

export default function Markdown({ content }: { content: string }) {
    return (
        <article className={styles.markdown}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components as never} // cast global une seule fois
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
