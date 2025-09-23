import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/getAllProjects";
import styles from "@/styles/components/projectsGrid.module.scss";

export default async function ProjectGrid({ locale }: { locale: string }) {
    const projects = await getAllProjects(locale); // "fr" ou "en"
    if (projects.length === 0) return <p>Aucun projet.</p>;

    return (
        <ul className={styles.projects__grid}>
            {projects.map((p) => (
                <li key={p.slug}>
                    <Link href={`/${locale}/projects/${p.slug}`}>
                        {p.cover && (
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    aspectRatio: "16/9",
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    src={p.cover}
                                    alt={p.title}
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                    priority={false}
                                />
                            </div>
                        )}
                        <div>
                            <h2>{p.title}</h2>
                            {p.subtitle && <p>{p.subtitle}</p>}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
