import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";
import {eslint} from "rollup-plugin-eslint";

export default [
  {
    external: ["react", "classnames", "styled-components"],
    input: {
      index: "src/index.ts",
      FormField: "src/form/field/FormField.tsx",
      Input: "src/form/input/Input.tsx",
    },
    output: {
      dir: "dist",
      format: 'cjs',
    },
    plugins: [
      terser(),
      eslint({
        fix: true
      }),
      typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
      })
    ]
  }
];
