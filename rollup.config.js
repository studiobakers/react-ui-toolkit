import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";
import {eslint} from "rollup-plugin-eslint";
import postcss from "rollup-plugin-postcss";
import stylelint from "rollup-plugin-stylelint";
import reactSvg from "rollup-plugin-react-svg";

export default [
  {
    external: ["react", "classnames"],
    input: {
      index: "src/index.ts",
      FormField: "src/form/field/FormField.tsx",
      Input: "src/form/input/Input.tsx",
      Checkbox: "src/form/input/checkbox/Checkbox.tsx",
      Radio: "src/form/input/radio/Radio.tsx",
      RadioGroup: "src/form/input/radio/group/RadioGroup.tsx",
      TypeaheadInput: "src/form/input/typeahead/TypeaheadInput.tsx",
      TypeaheadSelect: "src/select/typeahead/TypeaheadSelect.tsx",
      Dropdown: "src/dropdown/Dropdown.tsx",
      Button: "src/button/Button.tsx",
      Spinner: "src/spinner/Spinner.tsx"
    },
    output: {
      dir: "dist",
      format: 'cjs',
    },
    plugins: [
      reactSvg(),
      terser(),
      eslint({
        fix: true,
        exclude: ["./src/**/**.scss", "./src/**/**.svg"],
      }),
      stylelint({
        "ignoreFiles": ["**/*.ts", "**/*.js"]
      }),
      postcss(),
      typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
      })
    ]
  }
];
