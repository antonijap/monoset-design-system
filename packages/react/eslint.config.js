import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Polymorphic refs and framer-motion/Radix type gaps legitimately need a cast.
      "@typescript-eslint/no-explicit-any": "warn",
      // Empty prop interfaces that only extend another type are a deliberate pattern.
      "@typescript-eslint/no-empty-object-type": "off",
      // Compiler-oriented rule: reading a ref at render for a snapshot value (e.g. the
      // Form hook's isDirty) is safe in this non-compiler React 18 library. Advisory only.
      "react-hooks/refs": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
