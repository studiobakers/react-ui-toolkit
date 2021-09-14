import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";

storiesOf("Color Input", module).add("Color Input", () => (
  <Fragment>
    <FormField labelledBy={"Color Picker"} label={"Color Picker"}>
      <Input
        name={"colorPicker"}
        type={"color"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  </Fragment>
));
