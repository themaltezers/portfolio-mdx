// components/mdx/index.tsx (server)
import type { MDXComponents } from "next-mdx-remote-client/rsc";
import styles from "@/styles/mdx/components/prose.module.scss";
import { Accordion, AccordionItem } from "./Accordion";
import Section from "./Section";
import Carousel from "@/components/mdx/Carousel";
import Lightbox from "./LightBox";
import CustomLink from "./CustomLink";
import SocialLinks from "./SocialLinks";

export const mdxComponents: MDXComponents = {
    a: CustomLink,
    SocialLinks,
    Lightbox,
    Section,
    Carousel,
    Accordion,
    AccordionItem,
    wrapper: ({ children }) => (
        <div className={styles.mdx__wrapper}>{children}</div>
    ),
};
