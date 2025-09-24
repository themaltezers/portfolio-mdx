// components/mdx/SocialLinks.tsx
"use client";

import { FC } from "react";
import styles from "@/styles/mdx/components/social-links.module.scss";
import { IconContext } from "react-icons";
import { FaLinkedin, FaInstagram, FaGithubSquare } from "react-icons/fa";

type Props = {
    linkedin?: string;
    github?: string;
    instagram?: string;
    size?: number;
    ariaLabel?: string;
};

const SocialLinks: FC<Props> = ({
    linkedin,
    github,
    instagram,
    size = 54,
    ariaLabel = "Social links",
}) => {
    const items = [
        { href: linkedin, Icon: FaLinkedin, label: "LinkedIn" },
        { href: github, Icon: FaGithubSquare, label: "GitHub" },
        { href: instagram, Icon: FaInstagram, label: "Instagram" },
    ].filter((i) => Boolean(i.href));

    if (items.length === 0) return null;

    return (
        <ul className={styles.socials} aria-label={ariaLabel}>
            {items.map(({ href, Icon, label }) => (
                <li key={label}>
                    <a
                        href={href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                    >
                        <IconContext.Provider
                            value={{ className: "react-icons__socials" }}
                        >
                            <Icon />
                        </IconContext.Provider>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialLinks;
