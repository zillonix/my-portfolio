import next from "eslint-config-next/core-web-vitals";

/**
 * Flat ESLint config for Next.js 16. `eslint-config-next` v16 ships native
 * flat configs; the `core-web-vitals` entry bundles the recommended Next,
 * React, a11y, and TypeScript rule sets.
 */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
