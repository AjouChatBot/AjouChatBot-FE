module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: { version: "detect" },
  },
  // Tells eslint how to resolve imports
  "import/resolver": {
    node: {
      paths: ["src"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
  },
};
