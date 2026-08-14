import { defineConfig } from "eslint/config";
import neostandard from "neostandard";
import tailwind from "eslint-plugin-tailwindcss";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...neostandard({ noStyle: true, ts: true }),

  {
    ...tailwind.configs.recommended,
    settings: {
      tailwindcss: {
        // path to the CSS file with your `@import "tailwindcss"` / `@theme` block
        cssConfigPath: "./app/globals.css",
      },
    },
  },

  eslintConfigPrettier, // must stay last
]);
