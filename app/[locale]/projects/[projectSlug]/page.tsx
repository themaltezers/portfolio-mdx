import { promises as fs } from "fs";
import path from "path";
import { Suspense } from "react";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { PageSlide, ExitLink } from "@/components/PageSlide";
import { mdxComponents } from "@/components/mdx";

type Params = { locale: string; projectSlug: string };

type Meta = {
    title: string;
    subtitle?: string;
    date?: string;
    roles?: string[];
    stack?: string[];
    links?: { site?: string; github?: string; figma?: string };
    cover?: string;
};

export default async function ProjectPage({ params }: { params: Params }) {
    const { locale, projectSlug } = await params;

    const file = await fs.readFile(
        path.join(process.cwd(), "content/projects", `${projectSlug}.mdx`),
        "utf-8"
    );

    const { data, content } = matter(file);
    const meta = data as Meta;

    const options: MDXRemoteOptions = {
        mdxOptions: {
            /* … */
        },
        parseFrontmatter: false, // on a déjà parsé
    };

    return (
        <Suspense>
            <PageSlide>
                <ExitLink href={`/${locale}`}>
                    ← {locale === "fr" ? "Retour" : "Back"}
                </ExitLink>

                {/* Meta header */}
                <header className="project-meta">
                    {meta.cover && (
                        <div className="project-cover">
                            <Image
                                src={meta.cover}
                                alt={`${meta.title} cover`}
                                width={1600}
                                height={900}
                                priority
                            />
                        </div>
                    )}

                    <h1>{meta.title}</h1>
                    {meta.subtitle && (
                        <p className="subtitle">{meta.subtitle}</p>
                    )}
                    {meta.date && (
                        <p className="date">
                            {typeof meta.date === "string"
                                ? meta.date
                                : new Date(meta.date).toLocaleDateString(
                                      locale,
                                      {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      }
                                  )}
                        </p>
                    )}

                    {meta.roles?.length ? (
                        <section className="meta-block">
                            <h3>Rôles</h3>
                            <ul>
                                {meta.roles.map((r) => (
                                    <li key={r}>{r}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}

                    {meta.stack?.length ? (
                        <section className="meta-block">
                            <h3>Stack</h3>
                            <ul>
                                {meta.stack.map((s) => (
                                    <li key={s}>{s}</li>
                                ))}
                            </ul>
                        </section>
                    ) : null}

                    {(meta.links?.site ||
                        meta.links?.github ||
                        meta.links?.figma) && (
                        <section className="meta-block">
                            <h3>Liens</h3>
                            <ul>
                                {meta.links?.site && (
                                    <li>
                                        <a
                                            href={meta.links.site}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Site
                                        </a>
                                    </li>
                                )}
                                {meta.links?.github && (
                                    <li>
                                        <a
                                            href={meta.links.github}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    </li>
                                )}
                                {meta.links?.figma && (
                                    <li>
                                        <a
                                            href={meta.links.figma}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Figma
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </section>
                    )}
                </header>

                {/* Corps MDX */}
                <MDXRemote
                    source={content}
                    options={options}
                    components={mdxComponents}
                />
            </PageSlide>
        </Suspense>
    );
}
