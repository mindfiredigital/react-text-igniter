import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/commitlint.config.js",
      "**/.github/**",
      "**/component/src/assets/icon.jsx",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off",
    },
  },
];
