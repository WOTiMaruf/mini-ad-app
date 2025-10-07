// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettier from "eslint-config-prettier";

export default withNuxt(
  {
    rules: {
      semi: ["error", "never"],
      quotes: ["error", "single"],
      "vue/multi-word-component-names": "off",
      'prettier/prettier': 'off',
    },
  },
  prettier
);
