import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
                <Header />
                <div className="theme-btns">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>
            <main style={{ padding: "2rem" }}>{children}</main>
        </NextIntlClientProvider>
    );
}
