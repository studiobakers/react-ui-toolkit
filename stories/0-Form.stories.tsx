import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";
import PasswordInput from "../src/form/password-input/PasswordInput";
import CheckboxInput from "../src/form/input/checkbox/CheckboxInput";
import TimeInput from "../src/form/time/TimeInput";
import RadioGroup from "../src/form/input/radio/group/RadioGroup";
import Textarea from "../src/form/textarea/Textarea";
import StoryFragment from "./utils/StoryFragment";
import {getHourMinuteMeridiemFromDate} from "../src/core/utils/time/timeUtils";

storiesOf("Form", module)
  .add("Input States", () => (
    <Fragment>
      <Input
        name={"fullName"}
        onChange={(e) => console.log(e.currentTarget.value)}
        placeholder={"Full Name"}
      />

      <br />

      <Input
        name={"fullName"}
        onChange={(e) => console.log(e.currentTarget.value)}
        placeholder={"Full Name"}
        isDisabled={true}
      />
    </Fragment>
  ))
  .add("FormFieldWithInput", () => (
    <FormField labelledBy={"Full Name"} label={"Full Name"}>
      <Input
        name={"fullName"}
        placeholder={"Write your name"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("FormFieldWithInput.HasHelperMessage", () => (
    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      helperMessages={["You can include your middle name"]}>
      <Input name="fullName" onChange={(e) => console.log(e.currentTarget.value)} />
    </FormField>
  ))
  .add("FormFieldWithInput.HasErrorMessage", () => (
    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      errorMessages={["Please enter a full name"]}>
      <Input
        name={"fullName"}
        hasError={true}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("Textarea States", () => (
    <StoryFragment>
      <Textarea
        id={"textarea-fixed"}
        name={"Fixed size Textarea"}
        placeholder={"Write your address"}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />

      <br />

      <Textarea
        id={"textarea-fixed"}
        name={"Disabled fixed size Textarea"}
        placeholder={"Write your address"}
        isDisabled={true}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />
    </StoryFragment>
  ))
  .add("Textarea AutoSize", () => (
    <StoryFragment>
      <Textarea
        id={"textarea-auto-size"}
        name={"Auto size Textarea"}
        placeholder={"Write a paragraph"}
        autoSizeProps={{}}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />

      <br />

      <Textarea
        id={"textarea-auto-size"}
        name={"Disabled auto size Textarea"}
        placeholder={"Write a paragraph"}
        autoSizeProps={{}}
        isDisabled={true}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />
    </StoryFragment>
  ))
  .add("Textarea.HasErrorMessage", () => (
    <FormField
      labelledBy={"Address"}
      label={"Address"}
      errorMessages={["Please enter your address"]}>
      <Textarea
        id={"address"}
        name={"Address"}
        placeholder={"Write your address"}
        hasError={true}
        onChange={(e) => {
          console.log(e.currentTarget.value);
        }}
      />
    </FormField>
  ))
  .add("Password Input", () => (
    <FormField label={"Password"}>
      <PasswordInput
        testid={"LoginForm.input"}
        name={"password"}
        placeholder={"Enter password"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))

  .add("Number Input", () => (
    <Fragment>
      <StateProvider initialState={null}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"Price – maxFractionDigits={2}"}>
              <Input
                maxFractionDigits={2}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"$ 10"}
              />
            </FormField>

            <br />

            <FormField
              label={"Price - Has Error"}
              errorMessages={["Please enter a valid price"]}>
              <Input
                maxFractionDigits={2}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"$ 10"}
                hasError={true}
              />
            </FormField>
          </Fragment>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={null}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"Price (BTC) – maxFractionDigits={8}"}>
              <Input
                maxFractionDigits={8}
                name={"price"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
                placeholder={"Min. ₿ 0.00000001"}
              />
            </FormField>
          </Fragment>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={null}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"ID or Passport Number – maxFractionDigits={0}"}>
              <Input
                name={"id-number"}
                type={"number"}
                onChange={(e) => setState(e.currentTarget.value)}
                value={state}
              />
            </FormField>
          </Fragment>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Time Input", () => {
    const lessonEndTime = new Date(new Date().setMinutes(new Date().getMinutes() + 30));

    return (
      <Fragment>
        <FormField label={"Appointment Time"}>
          <TimeInput onChange={(e) => console.log(e)} />
        </FormField>

        <br />

        <FormField
          label={"Appointment Time - Has Error"}
          errorMessages={["Please enter a valid time"]}>
          <TimeInput onChange={(e) => console.log(e)} hasError={true} />
        </FormField>

        <br />

        <FormField label={"Appointment Time - Is Disabled"}>
          <TimeInput isDisabled={true} onChange={(e) => console.log(e)} />
        </FormField>

        <br />

        <FormField label={"Lesson Start Time - Selected Date: (Now)"}>
          <TimeInput
            startTime={new Date()}
            selectedDate={new Date()}
            onChange={(e) => console.log(e)}
          />
        </FormField>

        <br />

        <FormField label={"Lesson End Time - (Minimum 30 minutes)"}>
          <TimeInput
            startTime={lessonEndTime}
            placeholder={getHourMinuteMeridiemFromDate(lessonEndTime)}
            onChange={(e) => console.log(e)}
          />
        </FormField>
      </Fragment>
    );
  })
  .add("Color Input", () => (
    <FormField labelledBy={"Color Picker"} label={"Color Picker"}>
      <Input
        name={"colorPicker"}
        type={"color"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("Checkbox States", () => {
    const initialState = {
      rememberMe: true,
      termsAndConditions: false,
      privacyPolicy: true
    };

    return (
      <StateProvider initialState={initialState}>
        {(state, setState) => (
          <Fragment>
            <CheckboxInput
              onSelect={() => setState({...state, rememberMe: !state.rememberMe})}
              isSelected={state.rememberMe}
              item={{
                id: "rememberMe",
                content: "Remember Me",
                inputProps: {
                  name: "rememberMe",
                  htmlFor: "rememberMe",
                  value: "yes"
                }
              }}
            />

            <CheckboxInput
              onSelect={() =>
                setState({...state, termsAndConditions: !state.termsAndConditions})
              }
              isSelected={state.termsAndConditions}
              item={{
                id: "termsAndConditions",
                content: "Terms and Conditions",
                inputProps: {
                  name: "termsAndConditions",
                  htmlFor: "termsAndConditions",
                  value: "yes"
                }
              }}
            />

            <CheckboxInput
              onSelect={() => setState({...state, privacyPolicy: !state.privacyPolicy})}
              isSelected={state.privacyPolicy}
              isDisabled={true}
              item={{
                id: "privacyPolicy",
                content: "Privacy Policy",
                inputProps: {
                  name: "privacyPolicy",
                  htmlFor: "privacyPolicy",
                  value: "yes"
                }
              }}
            />
          </Fragment>
        )}
      </StateProvider>
    );
  })
  .add("Radio States", () => {
    const initialState = {
      firstInput: {
        choices: [
          {
            content: "Large",
            id: "Size, Large",
            inputProps: {
              htmlFor: "size-large",
              value: "size-large",
              name: "size"
            }
          },
          {
            content: "Medium",
            id: "Size, Medium",
            inputProps: {
              htmlFor: "size-medium",
              value: "size-medium",
              name: "size"
            }
          },
          {
            content: "All of them",
            id: "All of them",
            isDisabled: true,
            inputProps: {
              htmlFor: "all-of-them",
              value: "all-of-them",
              name: "size"
            }
          }
        ],
        selectedItem: null
      },
      secondInput: {
        choices: [
          {
            content: "Mac OSX",
            id: "Mac OSX",
            inputProps: {
              htmlFor: "mac-osx",
              value: "mac-osx",
              name: "os"
            }
          },
          {
            content: "Windows",
            id: "Windows",
            inputProps: {
              htmlFor: "windows",
              value: "windows",
              name: "os"
            }
          },
          {
            content: "Linux",
            id: "Linux",
            inputProps: {
              htmlFor: "linux",
              value: "linux",
              name: "os"
            }
          }
        ],
        selectedItem: null
      }
    };

    return (
      <StateProvider initialState={initialState}>
        {(state, setState) => (
          <Fragment>
            <FormField label={"Partially Disabled"}>
              <RadioGroup
                items={state.firstInput.choices}
                selectedItem={state.firstInput.selectedItem}
                onSelect={(item) =>
                  setState({
                    ...state,
                    firstInput: {...state.firstInput, selectedItem: item}
                  })
                }
              />
            </FormField>

            <FormField label={"Fully Disabled"}>
              <RadioGroup
                items={state.secondInput.choices}
                selectedItem={state.secondInput.selectedItem}
                isDisabled={true}
                onSelect={(item) =>
                  setState({
                    ...state,
                    secondInput: {...state.secondInput, selectedItem: item}
                  })
                }
              />
            </FormField>
          </Fragment>
        )}
      </StateProvider>
    );
  });
