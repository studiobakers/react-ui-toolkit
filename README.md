### @hipo/react-ui-toolkit 🧩

Hipo's React based UI Toolkit / [Demo](https://react-ui-toolkit.now.sh/)

### Usage

After installing the `@hipo/react-ui-toolkit` package you can start with simple example

```javascript
import {FormField, Input} from "@hipo/react-ui-toolkit/dist/Input";

// This import required to gather the initial styles of the components
// You can do it while bootstrapping your app
import "@hipo/react-ui-toolkit/dist/main.css";

function LoginForm() {
  return (
    <form>
      <FormField label="E-mail">
        <Input name="email" />
      </FormField>

      <FormField label="Password">
        <Input name="password" type="password" />
      </FormField>

      <Button type="submit">Login</Button>
    </form>
  );
}
```

### Styling

Every component holds a minimum amount of CSS. You can modify them via the CSS variables. See `_colors.scss` and `_measurement.scss`

Here is a simple example that shows how to customize `Button` and `Input`

```css
// _button.css
.primary-button {
  --button-bg: #989898;
  --button-color: black;
}

// _input.css
.input {
  --default-border-color: black;
}
```

### Storybook

- To run Storybook `npm run storybook`
- To generate Storybook build `npm run build-storybook`

### Development

Minimum system versions

- `node >= 12.x`
- `npm >= 6.x`

You can start to development with `npm run dev` command. The command watches for changes and builds the toolkit. If you want to generate a production ready build you can use `npm run build`.

Or you can run `npm run storybook` to see the components live. Storybook has own Webpack config that compiles and runs the components.

### Linter

ESLint and Prettier will handle the linting task. You can set a watcher for `npm run prettier:fix` command in your IDE otherwise you need to run prettier manually or right before the production build it'll automatically runs.

The ruleset can be found in [@hipo/eslint-config-base](https://github.com/Hipo/eslint-config-hipo-base), [@hipo/eslint-config-react](https://github.com/Hipo/eslint-config-hipo-base)
