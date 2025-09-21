import { promises as fs } from "fs";
import path from "path";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import type {
    MDXRemoteOptions,
    MDXComponents,
} from "next-mdx-remote-client/rsc";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { mdxComponents } from "@/components/mdx";

type PageProps = { params: Promise<{ locale: string }> };

const components: MDXComponents = {
    wrapper: function ({ children }: React.ComponentPropsWithoutRef<"div">) {
        return <div className="mdx-wrapper">{children}</div>;
    },
};

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params; // ⬅️ important

    if (!isLocale(locale)) return notFound();

    const content = await fs.readFile(
        path.join(process.cwd(), "content/contact", `contact.${locale}.mdx`),
        "utf-8"
    );

    const options: MDXRemoteOptions = {
        mdxOptions: {
            // ...
        },
        parseFrontmatter: true,
    };

    return (
        <Suspense>
            <MDXRemote
                source={content}
                options={options}
                components={mdxComponents}
            />
        </Suspense>
    );
}
