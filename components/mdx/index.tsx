// components/mdx/index.tsx (server)
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import { Accordion, AccordionItem } from "./Accordion";
import Section from "./Section";
import Carousel from "@/components/mdx/Carousel";
import Lightbox from "./LightBox";

export const mdxComponents: MDXComponents = {
    Lightbox,
    Section,
    Carousel,
    Accordion,
    AccordionItem,
    wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
};
