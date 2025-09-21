// ...
const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "max-lines": [
                "warn",
                { max: 200, skipBlankLines: true, skipComments: true },
            ],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "prefer-const": "error",
            "@typescript-eslint/explicit-function-return-type": [
                "warn",
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],
        },
        overrides: [
            {
                files: [
                    "app/**/*.{ts,tsx}",
                    "components/**/*.{ts,tsx}",
                    "features/**/*.{ts,tsx}",
                ],
                rules: {
                    // Autorise les components exportés sans return type explicite
                    "@typescript-eslint/explicit-function-return-type": "off",
                },
            },
        ],
    },
];
export default eslintConfig;
