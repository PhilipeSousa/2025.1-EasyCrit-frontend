import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    rules: {
      eqeqeq: "error",
      "no-unused-vars": "error",
      semi: "off",
      "for-direction": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-console": "error",
      "prefer-const": "warn",
      "yoda": "warn"
    }
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
