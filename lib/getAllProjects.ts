import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
    slug: string;
    title: string;
    subtitle?: string;
    date: string;
    cover?: string;
};

export async function getAllProjects(): Promise<ProjectMeta[]> {
    const dir = path.resolve(process.cwd(), "content", "projects");
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

    const projects = (items.filter(Boolean) as ProjectMeta[]).sort((a, b) =>
        a.date < b.date ? 1 : -1
    );
    return projects;
}
