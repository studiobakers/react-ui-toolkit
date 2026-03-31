import type {Meta, StoryFn} from "@storybook/react";
import {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";

const meta: Meta<typeof Input> = {
  title: "Color Input",
  component: Input
};

export default meta;

export const Default: StoryFn = () => (
  <Fragment>
    <FormField labelledBy={"Color Picker"} label={"Color Picker"}>
      <Input
        name={"colorPicker"}
        type={"color"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  </Fragment>
);
