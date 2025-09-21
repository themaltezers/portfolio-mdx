import ProjectGrid from "@/features/Project/ProjectsGrid";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return <ProjectGrid locale={locale} />;
}
