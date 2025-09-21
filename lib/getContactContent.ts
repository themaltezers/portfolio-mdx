import path from "node:path";
import { promises as fs } from "node:fs";
import matter from "gray-matter";

export type BioContent = {
    meta: { title: string; slug: string; date: string };
    content: string;
};

export async function getContactContent(
    locale: "fr" | "en"
): Promise<BioContent | null> {
    const filePath = path.join(
        process.cwd(),
        "content",
        `contact/contact.${locale}.mdx`
    );
    try {
        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);
        return { meta: data as BioContent["meta"], content };
    } catch {
        return null;
    }
}
