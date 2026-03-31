/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require("rollup-plugin-typescript2");
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const svgr = require("@svgr/rollup");
const path = require("path");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = [
  {
    external: (id) =>
      [
        "react",
        "react-dom",
        "classnames",
        "react-textarea-autosize",
        "uuid",
        "date-fns",
        "date-fns-tz"
      ].some((dep) => id === dep || id.startsWith(`${dep  }/`)),
    input: {
      index: "src/index.ts",
      FormField: "src/form/field/FormField.tsx",
      Input: "src/form/input/Input.tsx",
      NumberInput: "src/form/input/number/NumberInput.tsx",
      PasswordInput: "src/form/password-input/PasswordInput.tsx",
      Select: "src/select/SelectCompound.tsx",
      FileInput: "src/form/input/file/FileInput.tsx",
      Checkbox: "src/form/input/checkbox/CheckboxInput.tsx",
      Radio: "src/form/input/radio/RadioInput.tsx",
      RadioGroup: "src/form/input/radio/group/RadioGroup.tsx",
      TypeaheadInput: "src/form/input/typeahead/TypeaheadInput.tsx",
      TypeaheadSelect: "src/select/typeahead/TypeaheadSelect.tsx",
      List: "src/list/List.tsx",
      ListItem: "src/list/item/ListItem.tsx",
      Button: "src/button/Button.tsx",
      FileUploadButton: "src/button/file-upload/FileUploadButton.tsx",
      Spinner: "src/spinner/Spinner.tsx",
      Toast: "src/toast/Toast.tsx",
      Textarea: "src/form/textarea/Textarea.tsx",
      Toggle: "src/toggle/Toggle.tsx",
      Switch: "src/switch/Switch.tsx",
      ProgressBar: "src/progress-bar/ProgressBar.tsx",
      TimeInput: "src/form/time-input/TimeInput.tsx",
      DateTimer: "src/date-timer/DateTimer.tsx"
    },
    output: {
      dir: "dist",
      format: "cjs"
    },
    plugins: [
      svgr(),
      terser(),
      postcss({extract: path.resolve("dist/main.css")}),
      typescript({
        exclude: ["**/__tests__/**", "node_modules"],
        clean: true
      })
    ]
  }
];
