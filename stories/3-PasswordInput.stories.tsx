import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import FormField from "../src/form/field/FormField";
import PasswordInput from "../src/form/password-input/PasswordInput";

storiesOf("Password Input", module).add("Password Input", () => (
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
));
