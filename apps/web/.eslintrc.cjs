module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: ["@typescript-eslint", "react"],
    extends: [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "prettier"
    ],
    rules: {
      "react/react-in-jsx-scope": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  };