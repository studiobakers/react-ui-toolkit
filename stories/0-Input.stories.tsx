import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";
import StoryFragment from "./utils/StoryFragment";

storiesOf("Input", module)
  .add("Input", () => (
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
  ))
  .add("FormField with Input", () => (
    <StoryFragment>
      <FormField labelledBy={"Full Name"} label={"Full Name"}>
        <Input
          name={"fullName"}
          placeholder={"FormField with Input"}
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
          placeholder={"FormField with Input hasHelperMessage"}
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
          placeholder={"FormField with Input errorMessage"}
          hasError={true}
          onChange={(e) => console.log(e.currentTarget.value)}
        />
      </FormField>
    </StoryFragment>
  ));
