import type {Meta, StoryFn} from "@storybook/react";
import {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import TimeInput from "../src/form/time-input/TimeInput";
import StateProvider from "./utils/StateProvider";

const meta: Meta<typeof TimeInput> = {
  title: "Time Input",
  component: TimeInput
};

export default meta;

function isTimeInputValid(value: string): boolean {
  if (value.length === 0) return true;

  if (!/^\d/.test(value)) return false;

  const digits = value.replace(/[^0-9]/g, "");
  const letters = value.replace(/[^a-zA-Z]/g, "");

  if (letters.length > 0 && !/^[AaPpMm]+$/.test(letters)) return false;

  if (digits.length >= 1) {
    const firstDigit = parseInt(digits[0], 10);

    if (firstDigit > 2) return false;
  }

  if (digits.length >= 2) {
    const hour = parseInt(digits.slice(0, 2), 10);

    if (hour > 24 || hour === 0) return false;
  }

  if (digits.length >= 3) {
    const minuteFirstDigit = parseInt(digits[2], 10);

    if (minuteFirstDigit > 5) return false;
  }

  if (digits.length >= 4) {
    const minutes = parseInt(digits.slice(2, 4), 10);

    if (minutes > 59) return false;
  }

  if (digits.length > 4) return false;

  return true;
}

export const Default: StoryFn = () => (
  <Fragment>
    <StateProvider initialState={{value: ""}}>
      {(state, setState) => (
        <FormField label={"Appointment Time - Controlled"}>
          <TimeInput
            testid={"appointment-time"}
            initialDateTime={new Date()}
            value={state.value}
            onChange={(e) => setState({value: e})}
          />
        </FormField>
      )}
    </StateProvider>

    <br />

    <StateProvider initialState={{value: ""}}>
      {(state, setState) => (
        <FormField label={"Appointment Time - Controlled - without initialDateTime"}>
          <TimeInput
            testid={"appointment-time"}
            value={state.value}
            onChange={(e) => setState({value: e})}
          />
        </FormField>
      )}
    </StateProvider>

    <br />

    <StateProvider initialState={{value: "", hasError: false}}>
      {(state, setState) => (
        <FormField
          label={"Appointment Time - hasError"}
          errorMessages={state.hasError ? ["Please enter a valid time"] : []}>
          <TimeInput
            testid={"appointment-time-has-error"}
            value={state.value}
            onChange={(e) => {
              setState({value: e, hasError: !isTimeInputValid(e)});
            }}
            hasError={state.hasError}
          />
        </FormField>
      )}
    </StateProvider>

    <br />

    <StateProvider initialState={{value: ""}}>
      {(state, setState) => (
        <FormField label={"Appointment Time - isDisabled"}>
          <TimeInput
            testid={"appointment-time-is-disabled"}
            isDisabled={true}
            value={state.value}
            onChange={(e) => setState({value: ""})}
          />
        </FormField>
      )}
    </StateProvider>
  </Fragment>
);
