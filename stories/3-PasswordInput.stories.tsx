import type {Meta, StoryFn} from "@storybook/react";
import {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import PasswordInput from "../src/form/password-input/PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Password Input",
  component: PasswordInput
};

export default meta;

export const Default: StoryFn = () => (
  <Fragment>
    <FormField label={"Password"}>
      <PasswordInput
        testid={"LoginForm.input"}
        name={"password"}
        placeholder={"Enter password"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  </Fragment>
);
