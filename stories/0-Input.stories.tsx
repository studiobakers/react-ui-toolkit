import type {Meta, StoryFn} from "@storybook/react";
import {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";
import StoryFragment from "./utils/StoryFragment";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input
};

export default meta;

export const Default: StoryFn = () => (
  <Fragment>
    <Input
      name={"fullName"}
      onChange={(e) => console.log(e.currentTarget.value)}
      placeholder={"Input"}
    />

    <br />

    <Input
      name={"fullName"}
      onChange={(e) => console.log(e.currentTarget.value)}
      placeholder={"Disabled Input"}
      isDisabled={true}
    />
  </Fragment>
);

export const WithFormField: StoryFn = () => (
  <StoryFragment>
    <FormField labelledBy={"Full Name"} label={"Full Name"}>
      <Input
        name={"fullName"}
        placeholder={"Input with FormField"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>

    <br />

    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      helperMessages={["You can include your middle name"]}>
      <Input
        name="fullName"
        placeholder={"Input hasHelperMessage with FormField"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>

    <br />

    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      errorMessages={["Please enter a full name"]}>
      <Input
        name={"fullName"}
        placeholder={"Input errorMessage with FormField"}
        hasError={true}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  </StoryFragment>
);
