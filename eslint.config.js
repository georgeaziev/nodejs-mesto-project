export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.cjs", "**/*.mjs"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
    },
  },
];
