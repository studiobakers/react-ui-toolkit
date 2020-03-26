import React from "react";
import {storiesOf} from "@storybook/react";

import Input from "../src/form/input/Input";
import FormField from "../src/form/field/FormField";

storiesOf("Form", module)
  .add("Input", () => (
    <Input name="fullName"
           onChange={(e) => console.log(e.currentTarget.value)}/>
  ))
  .add("FormFieldWithInput", () => (
    <FormField labelledBy={"Full Name"} label={"Full Name"}>
      <Input name="fullName"
             onChange={(e) => console.log(e.currentTarget.value)}/>
    </FormField>
  ))
  .add("FormFieldWithInput.HasHelperMessage", () => (
    <FormField labelledBy={"Full Name"}
               label={"Full Name"}
               helperMessage={"You can include your middle name"}>
      <Input name="fullName"
             onChange={(e) => console.log(e.currentTarget.value)}/>
    </FormField>
  ))
  .add("FormFieldWithInput.HasErrorMessage", () => (
    <FormField labelledBy={"Full Name"}
               label={"Full Name"}
               errorMessage={"Please enter a full name"}>
      <Input name="fullName"
             onChange={(e) => console.log(e.currentTarget.value)}/>
    </FormField>
  ));
