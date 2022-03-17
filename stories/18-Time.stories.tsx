import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import TimeInput from "../dist/TimeInput";
import StateProvider from "./utils/StateProvider";

storiesOf("Time Input", module).add("Time Input", () => (
  <Fragment>
    <StateProvider initialState={null}>
      {(state, setState) => (
        <FormField label={"Appointment Time - Controlled"}>
          <TimeInput
            testid={"appointment-time"}
            initialDateTime={new Date()}
            value={state}
            onChange={setState}
          />
        </FormField>
      )}
    </StateProvider>

    <br />

    <FormField label={"Appointment Time - Uncontrolled"}>
      <TimeInput
        testid={"appointment-time"}
        initialDateTime={new Date()}
        onChange={(timeString) => console.log(timeString)}
      />
    </FormField>

    <br />

    <StateProvider initialState={null}>
      {(state, setState) => (
        <FormField label={"Appointment Time - Controlled - without initialDateTime"}>
          <TimeInput testid={"appointment-time"} value={state} onChange={setState} />
        </FormField>
      )}
    </StateProvider>

    <br />

    <FormField label={"Appointment Time - Uncontrolled - without initialDateTime"}>
      <TimeInput
        testid={"appointment-time"}
        onChange={(timeString) => console.log(timeString)}
      />
    </FormField>

    <br />

    <FormField
      label={"Appointment Time - hasError"}
      errorMessages={["Please enter a valid time"]}>
      <TimeInput
        testid={"appointment-time-has-error"}
        onChange={(e) => console.log(e)}
        hasError={true}
      />
    </FormField>

    <br />

    <FormField label={"Appointment Time - isDisabled"}>
      <TimeInput
        testid={"appointment-time-is-disabled"}
        isDisabled={true}
        onChange={(e) => console.log(e)}
      />
    </FormField>
  </Fragment>
));
