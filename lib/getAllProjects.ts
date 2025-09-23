import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
    slug: string;
    title: string;
    subtitle?: string;
    date: string;
    cover?: string;
};

async function dirExists(p: string) {
    try {
        return (await stat(p)).isDirectory();
    } catch {
        return false;
    }
}

/**
 * Lit les projets dans content/<locale>/projects
 * @param locale ex: "fr" | "en"
 */
export async function getAllProjects(
    locale: string = "fr"
): Promise<ProjectMeta[]> {
    // tente le dossier demandé, sinon fallback "fr"
    let dir = path.resolve(process.cwd(), "content", locale, "projects");
    if (!(await dirExists(dir))) {
        dir = path.resolve(process.cwd(), "content", "fr", "projects");
    }

    const files = await readdir(dir);

    const items = await Promise.all(
        files.map(async (file) => {
            if (!/\.mdx?$/i.test(file)) return null;
            const slug = file.replace(/\.mdx?$/i, "");
            const raw = await readFile(path.join(dir, file), "utf8");
            const { data } = matter(raw);

            if (!data?.title || !data?.date) return null;

            return {
                slug,
                title: String(data.title),
                subtitle: data.subtitle ? String(data.subtitle) : undefined,
                date: String(data.date),
                cover: data.cover ? String(data.cover) : undefined,
            } as ProjectMeta;
        })
    );

    // tri par date décroissante
    return (items.filter(Boolean) as ProjectMeta[]).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
