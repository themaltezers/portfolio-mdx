// next.config.ts
import type { NextConfig } from "next";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [join(__dirname, "styles")],
        prependData: `
      @use "@/styles/mixins.scss";
      @use "@/styles/vars.scss";
      @use "@/styles/colors.scss";
    `,
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
