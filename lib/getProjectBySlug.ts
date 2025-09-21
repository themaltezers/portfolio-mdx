import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectLinks = { site?: string; repo?: string };
export type ProjectMeta = {
    projectSlug: string;
    title: string;
    subtitle?: string;
    date: string; // YYYY-MM-DD
    cover?: string;
    roles?: string[];
    stack?: string[];
    links?: ProjectLinks;
};
export type Project = { meta: ProjectMeta; content: string };

export async function getProjectBySlug(
    projectSlug: string
): Promise<Project | null> {
    const filePath = path.join(
        process.cwd(),
        "content/projects",
        `${projectSlug}.md`
    );
    try {
        const raw = await readFile(filePath, "utf8");
        const { data, content } = matter(raw);

        const title = typeof data.title === "string" ? data.title.trim() : "";
        const date = typeof data.date === "string" ? data.date.trim() : "";

        if (!title || !date) {
            // front-matter incomplet -> retourne un objet avec meta minimale
            return {
                meta: {
                    projectSlug,
                    title: title || projectSlug,
                    date: date || "1970-01-01",
                },
                content,
            };
        }

        const linksObj = (data.links ?? {}) as Record<string, unknown>;
        const links: ProjectLinks | undefined =
            typeof linksObj === "object"
                ? {
                      site:
                          typeof linksObj.site === "string"
                              ? linksObj.site
                              : undefined,
                      repo:
                          typeof linksObj.repo === "string"
                              ? linksObj.repo
                              : undefined,
                  }
                : undefined;

        return {
            meta: {
                projectSlug,
                title,
                subtitle:
                    typeof data.subtitle === "string"
                        ? data.subtitle
                        : undefined,
                date,
                cover: typeof data.cover === "string" ? data.cover : undefined,
                roles: Array.isArray(data.roles)
                    ? data.roles.filter(
                          (x): x is string => typeof x === "string"
                      )
                    : undefined,
                stack: Array.isArray(data.stack)
                    ? data.stack.filter(
                          (x): x is string => typeof x === "string"
                      )
                    : undefined,
                links,
            },
            content,
        };
    } catch {
        return null;
    }
}
