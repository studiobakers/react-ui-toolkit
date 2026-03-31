import type {Meta, StoryFn} from "@storybook/react";

import FormField from "../src/form/field/FormField";
import Textarea from "../src/form/textarea/Textarea";
import StoryFragment from "./utils/StoryFragment";

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea
};

export default meta;

export const Default: StoryFn = () => (
  <StoryFragment>
    <Textarea
      id={"textarea-fixed"}
      name={"Fixed size Textarea"}
      placeholder={"Fixed size Textarea"}
      onChange={(e) => {
        console.log(e.currentTarget.value);
      }}
    />

    <br />

    <Textarea
      id={"textarea-fixed"}
      name={"Disabled fixed size Textarea"}
      placeholder={"Disabled fixed size Textarea"}
      isDisabled={true}
      onChange={(e) => {
        console.log(e.currentTarget.value);
      }}
    />

    <br />

    <Textarea
      id={"textarea-auto-size"}
      name={"Auto size Textarea"}
      placeholder={"Auto size Textarea"}
      autoSizeProps={{}}
      onChange={(e) => {
        console.log(e.currentTarget.value);
      }}
    />

    <br />

    <Textarea
      id={"textarea-auto-size"}
      name={"Disabled auto size Textarea"}
      placeholder={"Disabled auto size Textarea"}
      autoSizeProps={{}}
      isDisabled={true}
      onChange={(e) => {
        console.log(e.currentTarget.value);
      }}
    />

    <br />

    <FormField
      labelledBy={"Address"}
      label={"Address"}
      errorMessages={["Please enter your address"]}>
      <Textarea
        id={"address"}
        name={"Address"}
        placeholder={"Textarea with error message"}
        hasError={true}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />
    </FormField>
  </StoryFragment>
);
