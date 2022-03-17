import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";
import {eslint} from "rollup-plugin-eslint";
import postcss from "rollup-plugin-postcss";
import stylelint from "rollup-plugin-stylelint";
import reactSvg from "rollup-plugin-react-svg";

const path = require("path");

export default [
  {
    external: ["react", "react-dom", "classnames", "react-textarea-autosize"],
    input: {
      index: "src/index.ts",
      FormField: "src/form/field/FormField.tsx",
      Input: "src/form/input/Input.tsx",
      PasswordInput: "src/form/password-input/PasswordInput.tsx",
      FileInput: "src/form/input/file/FileInput.tsx",
      Checkbox: "src/form/input/checkbox/CheckboxInput.tsx",
      Radio: "src/form/input/radio/RadioInput.tsx",
      RadioGroup: "src/form/input/radio/group/RadioGroup.tsx",
      TypeaheadInput: "src/form/input/typeahead/TypeaheadInput.tsx",
      TypeaheadSelect: "src/select/typeahead/TypeaheadSelect.tsx",
      Dropdown: "src/dropdown/Dropdown.tsx",
      List: "src/list/List.tsx",
      ListItem: "src/list/item/ListItem.tsx",
      Button: "src/button/Button.tsx",
      FileUploadButton: "src/button/file-upload/FileUploadButton.tsx",
      Spinner: "src/spinner/Spinner.tsx",
      Toast: "src/toast/Toast.tsx",
      Textarea: "src/form/textarea/Textarea.tsx",
      Toggle: "src/toggle/Toggle.tsx",
      Switch: "src/switch/Switch.tsx",
      Countdown: "src/countdown/Countdown.tsx",
      ProgressBar: "src/progress-bar/ProgressBar.tsx",
      TimeInput: "src/form/time/TimeInput.tsx",
      DateTimer: "src/date-timer/DateTimer.tsx"
    },
    output: {
      dir: "dist",
      format: "cjs"
    },
    plugins: [
      reactSvg(),
      terser(),
      eslint({
        fix: true,
        exclude: ["./src/**/**.scss", "./src/**/**.svg"]
      }),
      stylelint({
        ignoreFiles: ["**/*.ts", "**/*.js"]
      }),
      postcss({
        extract: path.resolve("dist/main.css")
      }),
      typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
      })
    ]
  }
];
