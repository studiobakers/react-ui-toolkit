# @hipo/react-ui-toolkit 🧩

Bakers' React based UI Toolkit

## Getting started

First, install the package via npm:

```bash
npm install @hipo/react-ui-toolkit
```

After installing the package you should import the main CSS file to gather the initial styles of the components, and then import the components you want to use in your project.:

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

### How to style components?

Every component holds a minimum amount of CSS. You can modify them via the CSS variables. See `_colors.scss` and `_measurement.scss`

Here is a simple example that shows how to customize `Button` and `Input` styles by overriding the default CSS variables:

```scss
.button {
  // Override the default button styles using CSS variables

  --button-bg: #989898;
  --button-color: black;
}

.input {
  // Override the default input styles using CSS variables

  --default-border-color: black;
}
```

## Development

[Storybook](#storybook) is suggested for the development environment. It allows you to see the components in isolation and interact with them. It also supports hot-reloading, i.e. when you change the component, it automatically reloads the component in the browser.

First of all, you need to install the dependencies, in the project root folder, run:

```bash
npm install
```

> ⚠️ Make sure you are using the exact version of `node` and `npm` that are specified in the `engines` field of [package.json](/package.json) file. Otherwise, you may face some unexpected issues.

### Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

To run the Storybook development server on your local environment, you can use the following command:

```bash
npm run storybook
```

To generate a static build of the Storybook (usually, you don't need this. This is only necessary when you want to publish it to somewhere), you can use the following command:

```bash
npm run storybook:build
```

### Production Build

The production deployment is automated by GitHub Actions. Check the [.github/workflows/new-version.yml](/.github/workflows/new-version.yml) file for more information.

---

If you need to generate a production ready build for some reason, use:

```bash
npm run build
```

This will generate a `dist` folder that contains the compiled components.
