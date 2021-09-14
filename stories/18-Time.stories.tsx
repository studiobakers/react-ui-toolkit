import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";

import FormField from "../src/form/field/FormField";
import TimeInput from "../src/form/time/input/TimeInput";
import TimeDropdown from "../src/form/time/dropdown/TimeDropdown";
import TimeSelect from "../src/form/time/select/TimeSelect";
import StateProvider from "./utils/StateProvider";

storiesOf("Time", module)
  .add("Time Input", () => (
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
  ))
  .add("Time Dropdown", () => (
    <Fragment>
      <StateProvider initialState={null}>
        {(state, setState) => (
          <FormField label={'Lesson Start Time - startTimeString={"10:30 PM"}'}>
            <TimeDropdown
              testid={"lesson-start-time-dropdown"}
              startTimeString={"10:30 PM"}
              selectedOption={state}
              onSelect={(option) => setState(option)}
            />
          </FormField>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={null}>
        {(state, setState) => (
          <FormField label={"Lesson Start Time - startDate={new Date()}"}>
            <TimeDropdown
              testid={"lesson-start-time-dropdown"}
              startDate={new Date()}
              selectedOption={state}
              onSelect={(option) => setState(option)}
            />
          </FormField>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={null}>
        {(state, setState) => (
          <FormField label={"Lesson Start Time - without initial start time option"}>
            <TimeDropdown
              testid={"lesson-start-time-dropdown"}
              selectedOption={state}
              onSelect={(option) => setState(option)}
            />
          </FormField>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={null}>
        {(state, setState) => (
          <FormField label={"Lesson Start Time - isDisabled"}>
            <TimeDropdown
              testid={"lesson-start-time-dropdown-is-disabled"}
              isDisabled={true}
              startTimeString={"08:15 AM"}
              selectedOption={state}
              onSelect={(option) => setState(option)}
            />
          </FormField>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Time Select", () => (
    <Fragment>
      <FormField label={"Lesson Start Time - startTime={new Date()}"}>
        <TimeSelect
          testid={"lesson-start-time"}
          startTime={new Date()}
          onChange={(e) => console.log(e)}
        />
      </FormField>

      <br />

      <FormField label={"Lesson Start Time - isDisabled"}>
        <TimeSelect
          testid={"lesson-start-time"}
          startTime={new Date()}
          isDisabled={true}
          onChange={(e) => console.log(e)}
        />
      </FormField>

      <br />

      <FormField label={"Lesson Start Time - hasError"}>
        <TimeSelect
          testid={"lesson-start-time"}
          startTime={new Date()}
          hasError={true}
          onChange={(e) => console.log(e)}
        />
      </FormField>
    </Fragment>
  ));
