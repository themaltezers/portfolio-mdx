// lib/mdx-provider.tsx
"use client";

import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";

const components = {
    img: (props: any) => (
        <Image {...props} alt={props.alt || ""} width={1600} height={900} />
    ),
};

export function MDXWrapper({ children }: { children: React.ReactNode }) {
    return <MDXProvider components={components}>{children}</MDXProvider>;
}
